import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell/shell.component';
import { RouterModule } from '@angular/router';
import { UiFrameworkModule } from '@web-app/ui-framework';

@NgModule({
  declarations: [
    ShellComponent
  ],
  imports: [CommonModule, RouterModule, UiFrameworkModule],
  exports: [ShellComponent]
})
export class ShellModule {}
