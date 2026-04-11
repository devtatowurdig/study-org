import { Routes } from '@angular/router';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'login',
        loadComponent: () => import('./view/login/login').then((m) => m.Login),
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./view/dashboard/dashboard').then((m) => m.Dashboard),
    },
    {
        path: 'tasks',
        loadComponent: () => import('./view/tasks/tasks').then((m) => m.Tasks),
    },
    {
        path: 'calendar',
        loadComponent: () => import('./view/calendar/calendar').then((m) => m.Calendar),
    },
    {
        path: 'completed',
        loadComponent: () => import('./view/completed/completed').then((m) => m.Completed),
    },
    {
        path: 'settings',
        loadComponent: () => import('./view/settings/settings').then((m) => m.Settings),
    },
    { path: '**', redirectTo: 'login' }
];
