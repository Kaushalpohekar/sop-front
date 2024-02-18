import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreensRoutingModule } from './screens-routing.module';
import { ScreenLayoutComponent } from './screen-layout/screen-layout.component';
import { ScreenOverviewComponent } from './screen-overview/screen-overview.component';
import { HeaderScreenComponent } from './header-screen/header-screen.component';
import { FooterScreenComponent } from './footer-screen/footer-screen.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { DisplayScreenComponent } from './display-screen/display-screen.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    ScreenLayoutComponent,
    ScreenOverviewComponent,
    HeaderScreenComponent,
    FooterScreenComponent,
    DisplayScreenComponent,
  ],
  imports: [
    CommonModule,
    ScreensRoutingModule,
    MatIconModule,
    MatToolbarModule,
    CommonModule,
    DashboardRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    PdfViewerModule,
  ]
})
export class ScreensModule { }
