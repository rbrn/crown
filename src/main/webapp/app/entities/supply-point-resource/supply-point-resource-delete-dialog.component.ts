import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISupplyPointResource } from 'app/shared/model/supply-point-resource.model';
import { SupplyPointResourceService } from './supply-point-resource.service';

@Component({
  templateUrl: './supply-point-resource-delete-dialog.component.html'
})
export class SupplyPointResourceDeleteDialogComponent {
  supplyPointResource?: ISupplyPointResource;

  constructor(
    protected supplyPointResourceService: SupplyPointResourceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.supplyPointResourceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('supplyPointResourceListModification');
      this.activeModal.close();
    });
  }
}
