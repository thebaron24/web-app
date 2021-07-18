import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@web-app/material';
import { ContentGridModule } from '@web-app/ui-framework';

import { HomeRoutingModule } from './home.routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [CommonModule, HomeRoutingModule, ContentGridModule, MaterialModule]
})
export class HomeModule {}
