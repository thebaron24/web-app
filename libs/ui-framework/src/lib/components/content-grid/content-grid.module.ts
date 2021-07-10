import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@web-app/material';

import { ContentGridComponent } from './content-grid.component';



@NgModule({
  declarations: [
    ContentGridComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ContentGridComponent
  ]
})
export class ContentGridModule { }
