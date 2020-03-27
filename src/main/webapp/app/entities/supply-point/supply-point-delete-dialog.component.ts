import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISupplyPoint } from 'app/shared/model/supply-point.model';
import { SupplyPointService } from './supply-point.service';

@Component({
  templateUrl: './supply-point-delete-dialog.component.html'
})
export class SupplyPointDeleteDialogComponent {
  supplyPoint?: ISupplyPoint;

  constructor(
    protected supplyPointService: SupplyPointService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.supplyPointService.delete(id).subscribe(() => {
      this.eventManager.broadcast('supplyPointListModification');
      this.activeModal.close();
    });
  }
}
