import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@web-app/material';

import { GravityPointsHeaderComponent } from './gravity-points-header.component';



@NgModule({
  declarations: [
    GravityPointsHeaderComponent
  ],
  exports: [GravityPointsHeaderComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class GravityPointsHeaderModule { }
