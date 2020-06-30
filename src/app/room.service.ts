import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_GATEWAY } from 'src/environments/environment';
import { PricingService } from './pricing.service';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private httpClient: HttpClient,
    private pricingService: PricingService
    ) { }

  getAvailableRooms = (availabilityRequest: any) => {
    return this.httpClient.post(ROOM_API_LIST.AVAILABLE_ROOMS, availabilityRequest);
  }

  getAvailableRoomsWithPrices = (availabilityRequest: any, hotel: string) => {
    return forkJoin([this.getAvailableRooms(availabilityRequest), this.pricingService.getAllPrices(hotel)])
  }
}

const ROOM_API = {
  URL: API_GATEWAY.SERVER + "/rms-service/room"
}

const ROOM_API_LIST = {
  AVAILABLE_ROOMS: ROOM_API.URL + "/availability"
}

