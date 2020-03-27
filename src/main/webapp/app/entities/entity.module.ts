import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'supply-point',
        loadChildren: () => import('./supply-point/supply-point.module').then(m => m.CrownSupplyPointModule)
      },
      {
        path: 'resource',
        loadChildren: () => import('./resource/resource.module').then(m => m.CrownResourceModule)
      },
      {
        path: 'supply-point-resource',
        loadChildren: () => import('./supply-point-resource/supply-point-resource.module').then(m => m.CrownSupplyPointResourceModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class CrownEntityModule {}
