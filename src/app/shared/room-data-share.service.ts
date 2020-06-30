import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomDataShareService {

  private state: any;
  private basics: any;

  constructor() { }

  getStateObject = () => {
    return this.state;
  }

  setStateObject = (newState: any) => {
    this.state = newState;
  }

  getBasics = () => {
    return this.basics;
  }

  setBasics = (basics: any) => {
    this.basics = basics;
  }
}
