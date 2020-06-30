import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { RoomDetailComponent } from '../room-detail/room-detail.component';
import { ReservationComponent } from '../reservation/reservation.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'rooms',
    component: RoomDetailComponent
  },
  {
    path: 'reservations',
    component: ReservationComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
exports: [RouterModule]
})
export class DashboardRoutingModule { }