import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UiFrameworkModule } from '@web-app/ui-framework';

import { HomeRoutingModule } from './home.routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [CommonModule, HomeRoutingModule, UiFrameworkModule]
})
export class HomeModule {}
