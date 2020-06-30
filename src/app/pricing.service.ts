import { Injectable } from '@angular/core';
import { API_GATEWAY } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PricingService {

  constructor(private httpClient: HttpClient) { }

  getAllPrices = (hotelId: string) => {
    return this.httpClient.get(PRICING_API_LIST.CATEGORY_PRICES + hotelId)
  }
}

const PRICING_API = {
  URL: API_GATEWAY.SERVER + "/bms-service/pricing"
}

const PRICING_API_LIST = {
  CATEGORY_PRICES: PRICING_API.URL + "/rooms/"
}

