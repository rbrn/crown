import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IResource } from 'app/shared/model/resource.model';

@Component({
  selector: 'jhi-resource-detail',
  templateUrl: './resource-detail.component.html'
})
export class ResourceDetailComponent implements OnInit {
  resource: IResource | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ resource }) => (this.resource = resource));
  }

  previousState(): void {
    window.history.back();
  }
}
