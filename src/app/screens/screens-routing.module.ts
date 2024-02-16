import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScreenLayoutComponent } from './screen-layout/screen-layout.component';
import { ScreenOverviewComponent } from './screen-overview/screen-overview.component';
import { DisplayScreenComponent } from './display-screen/display-screen.component';
import { ScreenDisplayGuard } from './screen-service/screen-display.guard';

const routes: Routes = [
  { path: 'screens', component: ScreenOverviewComponent},
  { path: 'display/:screenId', component: DisplayScreenComponent},
  { path: '', redirectTo: 'screens', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScreensRoutingModule { }
