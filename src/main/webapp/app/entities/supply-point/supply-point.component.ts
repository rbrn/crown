import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISupplyPoint } from 'app/shared/model/supply-point.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { SupplyPointService } from './supply-point.service';
import { SupplyPointDeleteDialogComponent } from './supply-point-delete-dialog.component';

@Component({
  selector: 'jhi-supply-point',
  templateUrl: './supply-point.component.html'
})
export class SupplyPointComponent implements OnInit, OnDestroy {
  supplyPoints: ISupplyPoint[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;
  currentSearch: string;

  constructor(
    protected supplyPointService: SupplyPointService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute
  ) {
    this.supplyPoints = [];
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
      this.supplyPointService
        .search({
          query: this.currentSearch,
          page: this.page,
          size: this.itemsPerPage,
          sort: this.sort()
        })
        .subscribe((res: HttpResponse<ISupplyPoint[]>) => this.paginateSupplyPoints(res.body, res.headers));
      return;
    }

    this.supplyPointService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ISupplyPoint[]>) => this.paginateSupplyPoints(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.supplyPoints = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  search(query: string): void {
    this.supplyPoints = [];
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
    this.registerChangeInSupplyPoints();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISupplyPoint): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSupplyPoints(): void {
    this.eventSubscriber = this.eventManager.subscribe('supplyPointListModification', () => this.reset());
  }

  delete(supplyPoint: ISupplyPoint): void {
    const modalRef = this.modalService.open(SupplyPointDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.supplyPoint = supplyPoint;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateSupplyPoints(data: ISupplyPoint[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.supplyPoints.push(data[i]);
      }
    }
  }
}
