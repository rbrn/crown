import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISupplyPointResource, SupplyPointResource } from 'app/shared/model/supply-point-resource.model';
import { SupplyPointResourceService } from './supply-point-resource.service';
import { ISupplyPoint } from 'app/shared/model/supply-point.model';
import { SupplyPointService } from 'app/entities/supply-point/supply-point.service';

@Component({
  selector: 'jhi-supply-point-resource-update',
  templateUrl: './supply-point-resource-update.component.html'
})
export class SupplyPointResourceUpdateComponent implements OnInit {
  isSaving = false;
  supplypoints: ISupplyPoint[] = [];

  editForm = this.fb.group({
    id: [],
    numRequested: [],
    canProduce: [],
    numinStock: [],
    supplyPoint: []
  });

  constructor(
    protected supplyPointResourceService: SupplyPointResourceService,
    protected supplyPointService: SupplyPointService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ supplyPointResource }) => {
      this.updateForm(supplyPointResource);

      this.supplyPointService.query().subscribe((res: HttpResponse<ISupplyPoint[]>) => (this.supplypoints = res.body || []));
    });
  }

  updateForm(supplyPointResource: ISupplyPointResource): void {
    this.editForm.patchValue({
      id: supplyPointResource.id,
      numRequested: supplyPointResource.numRequested,
      canProduce: supplyPointResource.canProduce,
      numinStock: supplyPointResource.numinStock,
      supplyPoint: supplyPointResource.supplyPoint
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const supplyPointResource = this.createFromForm();
    if (supplyPointResource.id !== undefined) {
      this.subscribeToSaveResponse(this.supplyPointResourceService.update(supplyPointResource));
    } else {
      this.subscribeToSaveResponse(this.supplyPointResourceService.create(supplyPointResource));
    }
  }

  private createFromForm(): ISupplyPointResource {
    return {
      ...new SupplyPointResource(),
      id: this.editForm.get(['id'])!.value,
      numRequested: this.editForm.get(['numRequested'])!.value,
      canProduce: this.editForm.get(['canProduce'])!.value,
      numinStock: this.editForm.get(['numinStock'])!.value,
      supplyPoint: this.editForm.get(['supplyPoint'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISupplyPointResource>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ISupplyPoint): any {
    return item.id;
  }
}
