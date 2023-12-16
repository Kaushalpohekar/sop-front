import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScreenLayoutComponent } from './screen-layout/screen-layout.component';

const routes: Routes = [
  { path: 'screens', component: ScreenLayoutComponent},
  { path: '', redirectTo: 'screens', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScreensRoutingModule { }
