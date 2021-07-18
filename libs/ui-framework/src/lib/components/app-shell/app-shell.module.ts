import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@web-app/material';

import { AppShellComponent } from './app-shell.component';

@NgModule({
  declarations: [
    AppShellComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    AppShellComponent
  ]
})
export class AppShellModule { }
