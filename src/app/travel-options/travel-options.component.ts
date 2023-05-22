import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface OptionType {
  name: string;
  pricePerPassenger: number;
  vehicleType: {
    name: string;
    maxPassengers: number;
  }
}

@Component({
  selector: 'app-travel-options',
  templateUrl: './travel-options.component.html',
  styleUrls: ['./travel-options.component.scss']
})
export class TravelOptionsComponent implements OnInit {
  travelOptions: any;
  optionListings: OptionType[] = [];
  displayOptionListings: OptionType[] = [];
  totalListings: number = 0;
  maxPrice: number = 0;
  minPrice: number = 0;
  avgPrice: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTravelOptions();
  }

  getTravelOptions() {
    const url = '/api/QuoteRequest';
    return this.http.get(url).subscribe(response => {
      this.travelOptions = response as OptionType[];
      this.optionListings = this.travelOptions.listings
        .filter((option: OptionType) => { return option.vehicleType.maxPassengers > 2; })
        .sort((a: OptionType, b: OptionType) => a.pricePerPassenger - b.pricePerPassenger);
      this.totalListings = this.optionListings.length;
      this.maxPrice = Math.max(...this.optionListings.map((option: OptionType) => option.pricePerPassenger));
      this.minPrice = Math.min(...this.optionListings.map((option: OptionType) => option.pricePerPassenger));
      this.avgPrice = this.calculateAveragePrice();
    });
  }

  calculateAveragePrice(): number {
    const sum = this.optionListings.reduce((total: number, option: OptionType) => total + option.pricePerPassenger, 0);
    const result = sum / this.totalListings;
    return Number(parseFloat(result.toString()).toFixed(3));
  }

}
