import { NgModule } from '@angular/core';

import { ContentGridModule } from './components/content-grid/content-grid.module';
import { GravityPointsHeaderModule } from './components/gravity-points-header/gravity-points-header.module';

@NgModule({
  imports: [ContentGridModule, GravityPointsHeaderModule],
  exports: [ContentGridModule, GravityPointsHeaderModule]
})
export class UiFrameworkModule {}
