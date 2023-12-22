import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AddScreenComponent } from './dashboard-Pages/add-screen/add-screen.component';
import { MatCardModule } from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [
    OverviewComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    AddScreenComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,

  ]
})
export class DashboardModule { }
