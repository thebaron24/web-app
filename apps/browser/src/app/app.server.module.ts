import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ShellModule } from '@web-app/shell';
import { UiFrameworkModule } from '@web-app/ui-framework';
import { RoutingModule } from '@web-app/routing';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    RoutingModule,
    ShellModule,
    UiFrameworkModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
