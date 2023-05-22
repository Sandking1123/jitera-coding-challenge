import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { emailValidator } from './email-validator.directive';
import { Title } from '@angular/platform-browser';

interface ITraveller {
  name: string;
  email: string;
  channel: string;
  meetGreetOption: boolean;
  travelDate: string;
  travelTime: string;
  bookingPrice: number; 
}

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent implements OnInit {
  reactiveForm!: FormGroup;
  traveller: ITraveller;
  
  constructor(private titleService: Title) {
    this.traveller = {} as ITraveller;
  }

  ngOnInit(): void {
    this.titleService.setTitle('Form Page');
    this.reactiveForm = new FormGroup({
      name: new FormControl(this.traveller.name, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),
      email: new FormControl(this.traveller.email, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
        emailValidator()
      ]),
      channel: new FormControl(this.traveller.channel, [
        Validators.required
      ]),
      meetGreetOption: new FormControl(this.traveller.meetGreetOption, [
        Validators.required
      ]),
      travelDate: new FormControl(this.traveller.travelDate, [
        Validators.required
      ]),
      travelTime: new FormControl(this.traveller.travelTime, [
        Validators.required
      ]),
      bookingPrice: new FormControl(this.traveller.bookingPrice, [
        Validators.required,
        Validators.min(1)
      ])
    });
  }

  get name() {
    return this.reactiveForm.get('name')!;
  }
  
  get email() {
    return this.reactiveForm.get('email')!;
  }
  
  get channel() {
    return this.reactiveForm.get('channel')!;
  }
  
  get meetGreetOption() {
    return this.reactiveForm.get('meetGreetOption')!;
  }
  
  get travelDate() {
    return this.reactiveForm.get('travelDate')!;
  }
  
  get travelTime() {
    return this.reactiveForm.get('travelTime')!;
  }
  
  get bookingPrice() {
    return this.reactiveForm.get('bookingPrice')!;
  }
  
  submitForm(): void {
    if (this.reactiveForm.invalid) {
      for (const control of Object.keys(this.reactiveForm.controls)) {
        this.reactiveForm.controls[control].markAsTouched();
      }
      return;
    }

    this.traveller = this.reactiveForm.value;

    console.log('Traveller name:', this.traveller.name);
    console.log('Traveller email:', this.traveller.email);
    console.log('Channel:', this.traveller.channel);
    console.log('Travel Datetime:', this.traveller.travelDate +' '+this.traveller.travelTime);
    console.log('is meet & Greet Option requested?:', this.traveller.meetGreetOption);
    console.log('Booking Price:', this.traveller.bookingPrice);
  }
}