import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ShellModule } from '@web-app/shell';
import { routes } from './app.routes';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    RouterModule.forRoot(routes),
    ShellModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
