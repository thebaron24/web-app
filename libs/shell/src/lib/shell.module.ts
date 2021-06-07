import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@web-app/material';

import { ShellComponent } from './shell/shell.component';

@NgModule({
  declarations: [
    ShellComponent
  ],
  imports: [RouterModule, MaterialModule],
  exports: [ShellComponent]
})
export class ShellModule {}
