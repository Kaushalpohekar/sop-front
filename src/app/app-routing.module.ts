import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginLayoutComponent } from './login/login-layout/login-layout.component';
import { LoginGuard } from './login/auth/login.guard';
import { AuthGuard } from './login/auth/auth.guard';
import { LayoutComponent } from './dashboard/layout/layout.component';
import { ScreenLayoutComponent } from './screens/screen-layout/screen-layout.component';
import { RoleGuard } from './login/auth/role.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginLayoutComponent,
    canActivate: [LoginGuard],
    children: [
      { path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
    ]
  },
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [AuthGuard,RoleGuard],
    data: { roles: ['Admin'] },
    children: [
      { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
    ]
  },
  {
    path: 'screens',
    component: ScreenLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./screens/screens.module').then(m => m.ScreensModule) },
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
