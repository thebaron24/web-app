import { NgModule } from '@angular/core';
import { MaterialModule } from '@web-app/material';

import { ContentGridModule } from './components/content-grid/content-grid.module';

@NgModule({
  imports: [MaterialModule, ContentGridModule],
  exports: [ContentGridModule]
})
export class UiFrameworkModule {}
