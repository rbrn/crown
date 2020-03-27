import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISupplyPointResource, SupplyPointResource } from 'app/shared/model/supply-point-resource.model';
import { SupplyPointResourceService } from './supply-point-resource.service';
import { SupplyPointResourceComponent } from './supply-point-resource.component';
import { SupplyPointResourceDetailComponent } from './supply-point-resource-detail.component';
import { SupplyPointResourceUpdateComponent } from './supply-point-resource-update.component';

@Injectable({ providedIn: 'root' })
export class SupplyPointResourceResolve implements Resolve<ISupplyPointResource> {
  constructor(private service: SupplyPointResourceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISupplyPointResource> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((supplyPointResource: HttpResponse<SupplyPointResource>) => {
          if (supplyPointResource.body) {
            return of(supplyPointResource.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SupplyPointResource());
  }
}

export const supplyPointResourceRoute: Routes = [
  {
    path: '',
    component: SupplyPointResourceComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crownApp.supplyPointResource.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SupplyPointResourceDetailComponent,
    resolve: {
      supplyPointResource: SupplyPointResourceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crownApp.supplyPointResource.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SupplyPointResourceUpdateComponent,
    resolve: {
      supplyPointResource: SupplyPointResourceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crownApp.supplyPointResource.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SupplyPointResourceUpdateComponent,
    resolve: {
      supplyPointResource: SupplyPointResourceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crownApp.supplyPointResource.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
