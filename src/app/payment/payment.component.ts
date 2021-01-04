import { Component, OnInit } from '@angular/core';
import {AlertService} from '@full-fledged/alerts';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
  }
  proceed(): void {
    this.alertService.danger('Please check your card details.');
  }
}
