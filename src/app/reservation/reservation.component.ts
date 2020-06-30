import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";
import { RoomDataShareService } from '../shared/room-data-share.service';
import { ReservationService } from '../reservation.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  elements: Elements;
  card: StripeElement;
  stripe: FormGroup;
  price: any;
  paymentObj: any;
  basics: any;

  elementsOptions: ElementsOptions = {
    locale: 'en'
  };

  paymentDetails: any = {
    category: {},
    price: {}
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private stripeService: StripeService,
    private roomDataService: RoomDataShareService,
    private reservationService: ReservationService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    this.paymentDetails = this.roomDataService.getStateObject();
    this.basics = this.roomDataService.getBasics();
    if (!this.paymentDetails || !this.basics) {
      this.router.navigate(['/dashboard/rooms'])
      return;
    }

    this.paymentObj = {
      from: this.basics['dateFrom'],
      hotelId: this.paymentDetails['price']['hotel'],
      payment: {
        paymentToken: ""
      },
      room: {
        id: this.paymentDetails['id']
      },
      to: this.basics['dateTo']
    }

    this.setupStripe();
    this.setupViewPrice();
  }

  reserve = () => {

    const name = this.stripe.get('name').value;

    this.stripeService.createToken(this.card, { name })
      .subscribe(obj => {
        if (obj) {
          this.setToken(obj.token['id'])
          this.reservationService.reserveRoomAndPay(this.paymentObj).subscribe(
            (res) => {
              this.toastr.success(`Room reserved from:${res['from'].toString().split('T')[0]} to ${res['to'].toString().split('T')[0]}`)
            },
            (err) => {
              this.toastr.error(err.error.message || 'Failed to reserve room!')
            })
        } else {
          this.toastr.error("Payment service error!");
        }
      });
  }

  setToken = (token: string) => {
    this.paymentObj['payment']['paymentToken'] = token;
  }

  setupStripe = () => {
    this.stripe = this.fb.group({
      name: ['', [Validators.required]]
    });

    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;

        if (!this.card) {

          this.card = this.elements.create('card', {
            hidePostalCode: true,
            style: {
              base: {
                iconColor: '#666EE8',
                color: '#31325F',
                lineHeight: '40px',
                fontWeight: 300,
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                  color: '#CFD7E0'
                }
              }
            }
          });
          this.card.mount('#card-element');
        }
      });
  }

  setupViewPrice = () => {
    let price = this.paymentDetails['price']['price'];
    this.price = `${Math.floor(price/100)}.${(price%100) < 10 ? '0' : ''}${price%100}`;
  }
}