import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISupplyPointResource } from 'app/shared/model/supply-point-resource.model';

@Component({
  selector: 'jhi-supply-point-resource-detail',
  templateUrl: './supply-point-resource-detail.component.html'
})
export class SupplyPointResourceDetailComponent implements OnInit {
  supplyPointResource: ISupplyPointResource | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ supplyPointResource }) => (this.supplyPointResource = supplyPointResource));
  }

  previousState(): void {
    window.history.back();
  }
}
