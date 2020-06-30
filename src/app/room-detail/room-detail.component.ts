import { Component, OnInit } from '@angular/core';
import { HotelDataShareService } from '../shared/hotel-data-share.service';
import { RoomService } from '../room.service';
import { RoomDataShareService } from '../shared/room-data-share.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {

  availableRooms: any;
  hotelData: any;
  hotel: any;
  dateFrom: string;
  dateTo: string;

  constructor(
    private hotelDataService: HotelDataShareService,
    private roomService: RoomService,
    private roomDataShare: RoomDataShareService,
    private router: Router
  ) { }

  ngOnInit() {
    this.hotelData = this.hotelDataService.getStateObject();
    if (!this.hotelData) {
      this.router.navigate(['/dashboard'])
    }
    this.hotel = this.hotelData['hotel']
    this.getReservations();
  }

  onSelect = (room: any) => {
    this.roomDataShare.setStateObject(room);
    this.roomDataShare.setBasics({
      dateFrom: this.dateFrom,
      dateTo: this.dateTo
    })
    this.router.navigate(['/dashboard/reservations'])
  }

  getReservations = () => {
    let hotel = this.hotel['id'];
    let formData = this.hotelData['formData'];

    this.dateFrom = formData['fromDate'].format('YYYY-MM-DD');
    this.dateTo = formData['toDate'].format('YYYY-MM-DD');

    let request = {
      hotel: hotel,
      personCount: formData['personCount'],
      fromDate: this.dateFrom,
      toDate: this.dateTo
    }

    this.roomService.getAvailableRoomsWithPrices(request, hotel).subscribe(response => {
      this.availableRooms = response[0];
      this.availableRooms.forEach(element => {
        element['price'] = response[1][element['category']['id']];
      });
    })
  }
}
