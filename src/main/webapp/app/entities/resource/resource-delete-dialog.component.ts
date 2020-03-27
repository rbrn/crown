import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IResource } from 'app/shared/model/resource.model';
import { ResourceService } from './resource.service';

@Component({
  templateUrl: './resource-delete-dialog.component.html'
})
export class ResourceDeleteDialogComponent {
  resource?: IResource;

  constructor(protected resourceService: ResourceService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.resourceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('resourceListModification');
      this.activeModal.close();
    });
  }
}
