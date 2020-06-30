import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_GATEWAY } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private httpClient: HttpClient) { }

  reserveRoomAndPay = (reservation: any) => {
    return this.httpClient.post(RESERVATION_API_LIST.RESERVE_AND_PAY, reservation);
  }
}

const RESERVATION_API = {
  URL: API_GATEWAY.SERVER + "/rms-service/reservations"
}

const RESERVATION_API_LIST = {
  RESERVE_AND_PAY: RESERVATION_API.URL + "/reserve"
}

