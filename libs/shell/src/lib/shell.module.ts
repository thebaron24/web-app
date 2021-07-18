import { NgModule } from '@angular/core';
import { AppShellModule } from '@web-app/ui-framework';

import { ShellComponent } from './shell/shell.component';

@NgModule({
  declarations: [
    ShellComponent
  ],
  imports: [AppShellModule],
  exports: [ShellComponent]
})
export class ShellModule {}
