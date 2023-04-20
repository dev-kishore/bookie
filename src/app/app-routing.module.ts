import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: 'app/admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
    { path: 'app/user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
    { path: 'app/auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    { path:'', redirectTo: 'app/user', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
