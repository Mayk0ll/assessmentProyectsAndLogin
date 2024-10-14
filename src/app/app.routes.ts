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
    path: 'projects',
    loadComponent: () => import('./projects/layout/layout.component'),
    children: [
      {
        path: 'list',
        title: 'List projects',
        loadComponent: () => import('./projects/pages/list-projects/list-projects.component')
      },{
        path: 'view/:id',
        title: 'View_project',
        loadComponent: () => import('./projects/pages/view-projects/view-projects.component')
      },{
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'list',
      }
    ]
  },{
    path: '**',
    redirectTo: 'login',
  },{
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
