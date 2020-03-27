import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISupplyPoint, SupplyPoint } from 'app/shared/model/supply-point.model';
import { SupplyPointService } from './supply-point.service';

@Component({
  selector: 'jhi-supply-point-update',
  templateUrl: './supply-point-update.component.html'
})
export class SupplyPointUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    address: [],
    primaryContactName: [null, [Validators.required]],
    zip: [null, [Validators.required]],
    phonenumber: [],
    latx: [],
    longy: [],
    city: [],
    state: [],
    isDistributor: [],
    isHealthcare: [],
    hasSterilization: [],
    priority: [],
    notes: []
  });

  constructor(protected supplyPointService: SupplyPointService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ supplyPoint }) => {
      this.updateForm(supplyPoint);
    });
  }

  updateForm(supplyPoint: ISupplyPoint): void {
    this.editForm.patchValue({
      id: supplyPoint.id,
      name: supplyPoint.name,
      address: supplyPoint.address,
      primaryContactName: supplyPoint.primaryContactName,
      zip: supplyPoint.zip,
      phonenumber: supplyPoint.phonenumber,
      latx: supplyPoint.latx,
      longy: supplyPoint.longy,
      city: supplyPoint.city,
      state: supplyPoint.state,
      isDistributor: supplyPoint.isDistributor,
      isHealthcare: supplyPoint.isHealthcare,
      hasSterilization: supplyPoint.hasSterilization,
      priority: supplyPoint.priority,
      notes: supplyPoint.notes
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const supplyPoint = this.createFromForm();
    if (supplyPoint.id !== undefined) {
      this.subscribeToSaveResponse(this.supplyPointService.update(supplyPoint));
    } else {
      this.subscribeToSaveResponse(this.supplyPointService.create(supplyPoint));
    }
  }

  private createFromForm(): ISupplyPoint {
    return {
      ...new SupplyPoint(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      address: this.editForm.get(['address'])!.value,
      primaryContactName: this.editForm.get(['primaryContactName'])!.value,
      zip: this.editForm.get(['zip'])!.value,
      phonenumber: this.editForm.get(['phonenumber'])!.value,
      latx: this.editForm.get(['latx'])!.value,
      longy: this.editForm.get(['longy'])!.value,
      city: this.editForm.get(['city'])!.value,
      state: this.editForm.get(['state'])!.value,
      isDistributor: this.editForm.get(['isDistributor'])!.value,
      isHealthcare: this.editForm.get(['isHealthcare'])!.value,
      hasSterilization: this.editForm.get(['hasSterilization'])!.value,
      priority: this.editForm.get(['priority'])!.value,
      notes: this.editForm.get(['notes'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISupplyPoint>>): void {
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
}
