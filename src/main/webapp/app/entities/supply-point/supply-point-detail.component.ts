import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISupplyPoint } from 'app/shared/model/supply-point.model';

@Component({
  selector: 'jhi-supply-point-detail',
  templateUrl: './supply-point-detail.component.html'
})
export class SupplyPointDetailComponent implements OnInit {
  supplyPoint: ISupplyPoint | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ supplyPoint }) => (this.supplyPoint = supplyPoint));
  }

  previousState(): void {
    window.history.back();
  }
}
