import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { MeetupService } from '../../../_services/meetups/meetup.service';
import { HelperService } from '../../../_services/helper/helper.service';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

import * as moment from 'moment';

import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

@Component({
    selector: 'app-checkout',
    templateUrl: './zoom-meeting.component.html',
    styleUrls: ['./zoom-meeting.component.scss']
})

export class ZoomMeetingComponent implements OnInit {

    currency: string = 'INR';
    razor_key = 'rzp_test_7HIzld6TnnDX0r';
    paymentAmount: number = 5000;
    meetupData: any;
    meetupId: any
    quantity: any = 1;
    signatureEndpoint = 'https://kohort-dev.herokuapp.com/'
    apiKey = 'XexiX1gbQqSz1TF6-H456w'
    meetingNumber = '81044015323'
    role = 0
    leaveUrl = 'http://localhost:4200'
    userName = 'Kohort'
    userEmail = ''
    passWord = ''
    // pass in the registrant's token if your meeting or webinar requires registration. More info here:
    // Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/build/meetings/join#join-registered
    // Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/build/webinars/join#join-registered-webinar
    registrantToken = ''
    isLoading: any = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private meetupService: MeetupService,
        private helper: HelperService,
        public httpClient: HttpClient,
        @Inject(DOCUMENT) document
    ) { }

    ngOnInit(): void {

    }

    getSignature() {
        this.httpClient.post(this.signatureEndpoint, {
            meetingNumber: this.meetingNumber,
            role: this.role
        }).toPromise().then((data: any) => {
            if (data.signature) {
                console.log(data.signature)
                this.startMeeting(data.signature)
            } else {
                console.log(data)
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    startMeeting(signature) {

        // document.getElementById('zmmtg-root').style.display = 'block'

        ZoomMtg.init({
            leaveUrl: this.leaveUrl,
            success: (success) => {
                console.log(success)
                ZoomMtg.join({
                    signature: signature,
                    meetingNumber: this.meetingNumber,
                    userName: this.userName,
                    apiKey: this.apiKey,
                    userEmail: this.userEmail,
                    passWord: this.passWord,
                    tk: this.registrantToken,
                    success: (success) => {
                        console.log(success)
                    },
                    error: (error) => {
                        console.log(error)
                    }
                })

            },
            error: (error) => {
                console.log(error)
            }
        })
    }


}
