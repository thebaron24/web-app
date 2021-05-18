import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('@web-app/home').then((m) => m.HomeModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
