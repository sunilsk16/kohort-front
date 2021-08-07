import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { MeetupService } from '../../../_services/meetups/meetup.service';
import { HelperService } from '../../../_services/helper/helper.service';

import * as moment from 'moment';
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
    meetupData: any;
    meetupId: any
    quantity: any = 1;
    userData: any = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      country: '',
      state: '',
      zip: '',
      city: '',
      address: ''
    }
    isLoading: any = false;

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private meetupService: MeetupService,
      private helper: HelperService
    ) { }

    ngOnInit(): void {
      if (this.route.snapshot.params.id) {
        this.meetupId = this.route.snapshot.params.id;
        console.log('got id ', this.meetupId);
        this.meetupService.getMeetupById(this.meetupId)
        .then((res: any) =>{
          this.meetupData = res;
          console.log('meetupData ', res);
        })
      }
    }

    decreaseQty(){
      if(this.quantity > 1){
        return this.quantity--
      }
    }

    increaseQty(){
      return this.quantity++
    }

    purchaseNow(){
      let data = {
        ...this.userData,
        created_on: moment().format('DD-MM-YYYY hh:mm A'),
        createdAt: moment().format('x')
      }
      this.meetupService.addPurchase(data)
      .then(() =>{
        this.helper.showSuccess('Payment received !', '5000', 'Details sent to your mail !');
        this.router.navigate(['/'])
      })
      .then(() => {
          this.sendEmailUser()
        })
      .catch(() =>{
        this.helper.showError('Error purchasing event ');
      })
    }

    payNow() {
      if(!this.userData.firstName || !this.userData.lastName || !this.userData.email
         || !this.userData.country || !this.userData.address || !this.userData.state
         || !this.userData.zip || !this.userData.city || !this.userData.phoneNumber
      ) {
        this.helper.showError('Invalid inputs !', '3000', 'Enter Mandatory fields !');
        return false;
      }

        let self = this;
        var options = {
            // "key": "rzp_live_6tbesfpKT7Pld4",
            "key": "rzp_test_7HIzld6TnnDX0r",
            "amount": (this.meetupData.price * this.quantity) * 100, // 2000 paise = INR 20
            "name": "Kohort",
            "description": "Buy Ticket",
            "handler": function(response) {
                console.log(response);
                if (response && response.razorpay_payment_id) {
                    self.purchaseNow();
                }
            },
            "prefill": {
                "name": this.userData.firstName + this.userData.lastName,
                "email": this.userData.email,
                "contact": '+91' + this.userData.phoneNumber,
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

      sendEmailUser() {
        return new Promise((resolve) => {
          let subject = '[NOTICE] Event Purchase || Kohort.';
          let body=" Purchase Details";
          let toAddress = "firozss31@gmail.com";
          this.helper.sendEmail(subject, body, this.userData.email)
            .then((res: any) => {
              console.log('res ', res);
               resolve(true);
            })
            .catch((err: any) => {
              console.log('err ', err);
              resolve(false);
            })
        })
      }


        validateEmail(email) {
          var re = /\S+@\S+\.\S+/;
          return re.test(email);
        }


}
