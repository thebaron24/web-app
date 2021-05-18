import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home.routing.module';
import { UiFrameworkModule } from '@web-app/ui-framework';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [CommonModule, HomeRoutingModule, UiFrameworkModule]
})
export class HomeModule {}
