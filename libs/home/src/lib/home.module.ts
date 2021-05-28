import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home.routing.module';
import { UiFrameworkModule } from '@web-app/ui-framework';
import { MaterialModule } from '@web-app/material';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [CommonModule, HomeRoutingModule, UiFrameworkModule, MaterialModule]
})
export class HomeModule {}
