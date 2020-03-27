import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CrownSharedModule } from 'app/shared/shared.module';
import { SupplyPointComponent } from './supply-point.component';
import { SupplyPointDetailComponent } from './supply-point-detail.component';
import { SupplyPointUpdateComponent } from './supply-point-update.component';
import { SupplyPointDeleteDialogComponent } from './supply-point-delete-dialog.component';
import { supplyPointRoute } from './supply-point.route';

@NgModule({
  imports: [CrownSharedModule, RouterModule.forChild(supplyPointRoute)],
  declarations: [SupplyPointComponent, SupplyPointDetailComponent, SupplyPointUpdateComponent, SupplyPointDeleteDialogComponent],
  entryComponents: [SupplyPointDeleteDialogComponent]
})
export class CrownSupplyPointModule {}
