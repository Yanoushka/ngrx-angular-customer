import { Routes } from '@angular/router';
import { authGuard } from './_service/auth.guard';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'customer',
        loadComponent: () => import('./components/customer/customer.component')
            .then(m => m.CustomerComponent),
        canActivate: [authGuard]
    },
    {
        path: 'customer/add',
        loadComponent: () => import('./components/customer/add-customer/add-customer.component')
            .then(m => m.AddCustomerComponent),
        canActivate: [authGuard]
    },
    {
        path: 'customer/edit/:id',
        loadComponent: () => import('./components/customer/add-customer/add-customer.component')
            .then(m => m.AddCustomerComponent),
        canActivate: [authGuard]
    }
];
