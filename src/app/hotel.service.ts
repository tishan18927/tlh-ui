import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_GATEWAY } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private httpClient: HttpClient) { }

  getHotelsList = () => {
    return this.httpClient.get(HOTEL_API_LIST.AVAILABLE_HOTELS);
  }
  
}

const HOTEL_API = {
  URL: API_GATEWAY.SERVER + "/rms-service/hotels"
}

const HOTEL_API_LIST = {
  AVAILABLE_HOTELS: HOTEL_API.URL + "/get-all"
}
