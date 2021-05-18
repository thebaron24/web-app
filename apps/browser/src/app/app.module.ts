import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ShellModule } from '@web-app/shell';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UiFrameworkModule } from '@web-app/ui-framework';
import { RoutingModule } from '@web-app/routing';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RoutingModule,
    ShellModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000' }
    ),
    BrowserAnimationsModule,
    UiFrameworkModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
