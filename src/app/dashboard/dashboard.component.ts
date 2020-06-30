import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HotelService } from '../hotel.service';
import { HotelDataShareService } from '../shared/hotel-data-share.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  keyword = 'name';

  initData: any;

  hotels: any;

  selectedHotel: any;

  searchForm = new FormGroup({
    personCount: new FormControl('', Validators.required),
    fromDate: new FormControl('', Validators.required),
    toDate: new FormControl()
  });


  constructor (
    private hotelService: HotelService,
    private hotelDataService: HotelDataShareService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.hotelService.getHotelsList().subscribe((res) => {
      this.initData = res;
      this.hotels = JSON.parse(JSON.stringify(res))
    }, (error) => {
      this.toastr.error("Failed to load hotels.")
    })

    if (this.hotelDataService.getStateObject()) {
      this.selectedHotel = this.hotelDataService.getStateObject()['hotel'];
      this.searchForm.setValue(this.hotelDataService.getStateObject()['formData']);
    }
  }

  onSubmit() {
    this.hotelDataService.setStateObject({
      hotel: this.selectedHotel,
      formData: this.searchForm.value
    })

    this.router.navigate(['/dashboard/rooms']);
  }

  selectEvent(item) {
    this.selectedHotel = item;
  }

  onChangeSearch(val: string) {
    if (val) {
      let keyword_case_insensitive = val.toLowerCase()
      this.hotels = this.initData.filter(h => h && (
        (h.city && h.city.toLowerCase().includes(keyword_case_insensitive)) ||
        (h.name && h.name.toLowerCase().includes(keyword_case_insensitive))
      ));
    }
  }

  onFocused(e) {
  }

}
