import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HotelDataShareService {

  private state: any;

  constructor() { }

  getStateObject = () => {
    return this.state;
  }

  setStateObject = (newState: any) => {
    this.state = newState;
  }
}
