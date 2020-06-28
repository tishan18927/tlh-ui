import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  keyword = 'name';

  initData = [
    {
      "id": 1,
      "name": "Britannia",
      "city": "London",
      "rooms": []
    },
    {
      "id": 1,
      "name": "Maga",
      "city": "Iquador",
      "rooms": []
    },
    {
      "id": 1,
      "name": "Carlton",
      "city": "Paris",
      "rooms": []
    },
    {
      "id": 1,
      "name": "Grait Britain",
      "city": "Qualalampur",
      "rooms": []
    }
  ];

  hotels = JSON.parse(JSON.stringify(this.initData));

  selectedHotel: any;

  searchForm = new FormGroup({
    personCount: new FormControl('', Validators.required),
    start: new FormControl('', Validators.required),
    end: new FormControl()
  }
  );

  // range = new FormGroup({
  //   start: new FormControl(),
  //   end: new FormControl()
  // });


  constructor() { }

  ngOnInit() {

  }

  onSubmit() {
    console.log(this.searchForm.value);
  }

  selectEvent(item) {
    this.selectedHotel = item;
  }

  onChangeSearch(val: string) {
    if (val) {
      let keyword_case_insensitive = val.toLowerCase()
      this.hotels = this.initData.filter(h => h && (
        (h.city && h.city.toLowerCase().includes(keyword_case_insensitive))
      ));
    }
  }

  onFocused(e) {
  }

}
