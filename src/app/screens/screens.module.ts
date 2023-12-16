import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreensRoutingModule } from './screens-routing.module';
import { ScreenLayoutComponent } from './screen-layout/screen-layout.component';
import { ScreenOverviewComponent } from './screen-overview/screen-overview.component';


@NgModule({
  declarations: [
    ScreenLayoutComponent,
    ScreenOverviewComponent
  ],
  imports: [
    CommonModule,
    ScreensRoutingModule
  ]
})
export class ScreensModule { }
