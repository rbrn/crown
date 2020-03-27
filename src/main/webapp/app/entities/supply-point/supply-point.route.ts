import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISupplyPoint, SupplyPoint } from 'app/shared/model/supply-point.model';
import { SupplyPointService } from './supply-point.service';
import { SupplyPointComponent } from './supply-point.component';
import { SupplyPointDetailComponent } from './supply-point-detail.component';
import { SupplyPointUpdateComponent } from './supply-point-update.component';

@Injectable({ providedIn: 'root' })
export class SupplyPointResolve implements Resolve<ISupplyPoint> {
  constructor(private service: SupplyPointService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISupplyPoint> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((supplyPoint: HttpResponse<SupplyPoint>) => {
          if (supplyPoint.body) {
            return of(supplyPoint.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SupplyPoint());
  }
}

export const supplyPointRoute: Routes = [
  {
    path: '',
    component: SupplyPointComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crownApp.supplyPoint.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SupplyPointDetailComponent,
    resolve: {
      supplyPoint: SupplyPointResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crownApp.supplyPoint.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SupplyPointUpdateComponent,
    resolve: {
      supplyPoint: SupplyPointResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crownApp.supplyPoint.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SupplyPointUpdateComponent,
    resolve: {
      supplyPoint: SupplyPointResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crownApp.supplyPoint.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
