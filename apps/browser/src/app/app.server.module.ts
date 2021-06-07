import { NgModule } from '@angular/core';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { ServerModule } from '@angular/platform-server';
import { RoutingModule } from '@web-app/routing';
import { ShellModule } from '@web-app/shell';
import { UiFrameworkModule } from '@web-app/ui-framework';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    RoutingModule,
    ShellModule,
    UiFrameworkModule,
    FlexLayoutServerModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
