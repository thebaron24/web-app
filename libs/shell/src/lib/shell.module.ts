import { NgModule } from '@angular/core';
import { ShellComponent } from './shell/shell.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@web-app/material';

@NgModule({
  declarations: [
    ShellComponent
  ],
  imports: [RouterModule, MaterialModule],
  exports: [ShellComponent]
})
export class ShellModule {}
