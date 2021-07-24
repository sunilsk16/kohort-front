import { Component, OnInit } from '@angular/core';
declare var Razorpay: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

currency: string = 'INR';
razor_key = 'rzp_test_7HIzld6TnnDX0r';
paymentAmount: number = 5000;

  constructor() { }

  ngOnInit(): void {
  }

       payNow() {

       let self = this;
       var options = {
         // "key": "rzp_live_6tbesfpKT7Pld4",
         "key": "rzp_test_7HIzld6TnnDX0r",
         "amount": 600 * 100, // 2000 paise = INR 20
         "name": "Kohort",
         "description": "Buying payment",
         "handler": function(response) {
           console.log(response);
           if (response && response.razorpay_payment_id) {
             // self.bookNow();
           }
         },
         "prefill": {
           "name": 'Kohort',
           "email": 'kohort',
           "contact": '+91' + '9654125',
         },
         "notes": {},
         "theme": {
           "color": "blue"
         }
       };
       var rzp1 = new Razorpay(options);

       rzp1.open();

       // body...
     }


}
