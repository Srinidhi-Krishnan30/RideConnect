import { Routes } from '@angular/router';

import { LoginPageComponent } from './auth/login-page/login-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AppComponent } from './app.component';
import { UserPageComponent } from './user-page/user-page.component';
export const routes: Routes = [
    {path : '',component: LoginPageComponent},
    {
        path: 'admin',
        component: AdminPageComponent
    },
    {
        path: 'user',
        component: UserPageComponent
    },
];
