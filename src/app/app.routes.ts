import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { AddEditProductComponent } from './pages/add-edit-product/add-edit-product.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ItiTracksComponent } from './pages/iti-tracks/iti-tracks.component';
import { TodosComponent } from './pages/todos/todos.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'iti-tracks',
        component: ItiTracksComponent,
    },
    {
        path: 'todos',
        component: TodosComponent,
    },
    {
        path: 'products',
        component: ProductsComponent,
    },
    {
        path: 'products/:id',
        component: ProductDetailsComponent,
    },
    {
        path: 'products/:id/edit',
        component: AddEditProductComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];
