import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { ReservationComponent } from '../reservation/reservation.component';
import { RoomDetailComponent } from '../room-detail/room-detail.component';
import { MatIconModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    AutocompleteLibModule,
    MatIconModule
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DIALOG_DATA, useValue: {  } },
    { provide: MatDialogRef, useValue: { } }
  ],
  declarations: [
    DashboardComponent, 
    ReservationComponent,
    RoomDetailComponent
  ]
})
export class DashboardModule { }
