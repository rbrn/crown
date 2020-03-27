import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CrownSharedModule } from 'app/shared/shared.module';
import { SupplyPointResourceComponent } from './supply-point-resource.component';
import { SupplyPointResourceDetailComponent } from './supply-point-resource-detail.component';
import { SupplyPointResourceUpdateComponent } from './supply-point-resource-update.component';
import { SupplyPointResourceDeleteDialogComponent } from './supply-point-resource-delete-dialog.component';
import { supplyPointResourceRoute } from './supply-point-resource.route';

@NgModule({
  imports: [CrownSharedModule, RouterModule.forChild(supplyPointResourceRoute)],
  declarations: [
    SupplyPointResourceComponent,
    SupplyPointResourceDetailComponent,
    SupplyPointResourceUpdateComponent,
    SupplyPointResourceDeleteDialogComponent
  ],
  entryComponents: [SupplyPointResourceDeleteDialogComponent]
})
export class CrownSupplyPointResourceModule {}
