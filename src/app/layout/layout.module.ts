import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { AppRoutingModule } from '../app-routing.module';
import { DashboardModule } from '../dashboard/dashboard.module';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [LayoutComponent, AppRoutingModule],
  declarations: [LayoutComponent]
})
export class LayoutModule { }
