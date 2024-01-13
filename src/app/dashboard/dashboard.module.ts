import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AddScreenComponent } from './dashboard-Pages/add-screen/add-screen.component';
import { MatCardModule } from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { ImageComponent } from './Dash-pages/image/image.component';
import { TextComponent } from './Dash-pages/text/text.component';
import { PdfComponent } from './Dash-pages/pdf/pdf.component';
import { PptComponent } from './Dash-pages/ppt/ppt.component';
import { VideoComponent } from './Dash-pages/video/video.component';
import { ScreenComponent } from './Dash-pages/screen/screen.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { MatTableModule } from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ScreenListComponent } from './Dash-pages/screen-list/screen-list.component';



@NgModule({
  declarations: [
    OverviewComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    AddScreenComponent,
    ImageComponent,
    TextComponent,
    PdfComponent,
    PptComponent,
    VideoComponent,
    ScreenComponent,
    ScreenListComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    NgxExtendedPdfViewerModule,
    MatSlideToggleModule,
    MatPaginatorModule,

  ]
})
export class DashboardModule { }
