import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IResource, Resource } from 'app/shared/model/resource.model';
import { ResourceService } from './resource.service';
import { ResourceComponent } from './resource.component';
import { ResourceDetailComponent } from './resource-detail.component';
import { ResourceUpdateComponent } from './resource-update.component';

@Injectable({ providedIn: 'root' })
export class ResourceResolve implements Resolve<IResource> {
  constructor(private service: ResourceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IResource> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((resource: HttpResponse<Resource>) => {
          if (resource.body) {
            return of(resource.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Resource());
  }
}

export const resourceRoute: Routes = [
  {
    path: '',
    component: ResourceComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crownApp.resource.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ResourceDetailComponent,
    resolve: {
      resource: ResourceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crownApp.resource.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ResourceUpdateComponent,
    resolve: {
      resource: ResourceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crownApp.resource.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ResourceUpdateComponent,
    resolve: {
      resource: ResourceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crownApp.resource.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
