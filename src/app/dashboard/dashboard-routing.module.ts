import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { TextComponent } from './Dash-pages/text/text.component';

const routes: Routes = [
  { path: 'dashboard', component: OverviewComponent},
  { path: 'test', component: TextComponent},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
