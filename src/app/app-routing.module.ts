import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginLayoutComponent } from './login/login-layout/login-layout.component';
import { LoginGuard } from './login/auth/login.guard';
import { AuthGuard } from './login/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginLayoutComponent,
    // canActivate: [LoginGuard],
    children: [
      { path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
