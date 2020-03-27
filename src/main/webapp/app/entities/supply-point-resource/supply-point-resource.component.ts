import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISupplyPointResource } from 'app/shared/model/supply-point-resource.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { SupplyPointResourceService } from './supply-point-resource.service';
import { SupplyPointResourceDeleteDialogComponent } from './supply-point-resource-delete-dialog.component';

@Component({
  selector: 'jhi-supply-point-resource',
  templateUrl: './supply-point-resource.component.html'
})
export class SupplyPointResourceComponent implements OnInit, OnDestroy {
  supplyPointResources: ISupplyPointResource[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;
  currentSearch: string;

  constructor(
    protected supplyPointResourceService: SupplyPointResourceService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute
  ) {
    this.supplyPointResources = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll(): void {
    if (this.currentSearch) {
      this.supplyPointResourceService
        .search({
          query: this.currentSearch,
          page: this.page,
          size: this.itemsPerPage,
          sort: this.sort()
        })
        .subscribe((res: HttpResponse<ISupplyPointResource[]>) => this.paginateSupplyPointResources(res.body, res.headers));
      return;
    }

    this.supplyPointResourceService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ISupplyPointResource[]>) => this.paginateSupplyPointResources(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.supplyPointResources = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  search(query: string): void {
    this.supplyPointResources = [];
    this.links = {
      last: 0
    };
    this.page = 0;
    if (query) {
      this.predicate = '_score';
      this.ascending = false;
    } else {
      this.predicate = 'id';
      this.ascending = true;
    }
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSupplyPointResources();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISupplyPointResource): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSupplyPointResources(): void {
    this.eventSubscriber = this.eventManager.subscribe('supplyPointResourceListModification', () => this.reset());
  }

  delete(supplyPointResource: ISupplyPointResource): void {
    const modalRef = this.modalService.open(SupplyPointResourceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.supplyPointResource = supplyPointResource;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateSupplyPointResources(data: ISupplyPointResource[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.supplyPointResources.push(data[i]);
      }
    }
  }
}
