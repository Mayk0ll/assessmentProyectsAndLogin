import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('./auth/login/login.component')
      },{
        path: 'register',
        title: 'Register',
        loadComponent: () => import('./auth/register/register.component')
      },{
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },{
    path: 'proyects',
    loadComponent: () => import('./proyects/layout/layout.component'),
    children: [
      {
        path: '',
        title: 'List Proyects',
        loadComponent: () => import('./proyects/pages/list-proyects/list-proyects.component')
      },{
        path: ':id',
        title: 'View Proyect',
        loadComponent: () => import('./proyects/pages/view-proyect/view-proyect.component')
      },{
        path: '',
        redirectTo: 'proyects',
        pathMatch: 'full'
      }
    ]
  },{
    path: '**',
    redirectTo: 'proyects',
  },{
    path: '',
    redirectTo: 'proyects',
    pathMatch: 'full'
  }
];
