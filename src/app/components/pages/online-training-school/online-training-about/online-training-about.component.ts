import { Component, OnInit } from '@angular/core';
import { MeetupService } from '../../../../_services/meetups/meetup.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import * as _ from 'underscore';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-online-training-about',
    templateUrl: './online-training-about.component.html',
    styleUrls: ['./online-training-about.component.scss']
})
export class OnlineTrainingAboutComponent implements OnInit {
    show = 6;
    meetupList: any = [];
    isFavourite: any;
    isClicked = false;
    pastMeetupList : any = [];
displayStyle = "none";
    constructor(
        public meetupService: MeetupService,
        public router: Router,
    ) { }

    ngOnInit(): void {
      this.meetupService.getPastMeetups()
      .then((res : any) => {
        this.pastMeetupList = res;
        console.log("getPastMeetups", res);

      })
        this.meetupService.getAllMeetups()
            .then((res: any) => {
                console.log('meetupsssss ', res);
                this.meetupList = _.reject(res, { 'isActive': true });
            })
    }

    // getDate(meetupDate: any) {
    //     if (meetupDate) {
    //         return moment(meetupDate, 'DD-MM-YYYY').format('MMM DD, YYYY')
    //     } else {
    //         return ''
    //     }
    // }
    readableDateFormat(userDate: any) {
        if (!_.isObject(userDate)) {
            return moment(userDate, 'DD-MM-YYYY').format('MMM DD, YYYY')

        } else {
            let year = userDate.year;
            let month = userDate.month <= 9 ? '0' + userDate.month : userDate.month;;
            let day = userDate.day <= 9 ? '0' + userDate.day : userDate.day;;
            let finalDate = day + "-" + month + "-" + year;
            return moment(finalDate, 'DD-MM-YYYY').format('MMM DD, YYYY')
        }
    }
    getReadableTime(userTime, isFirst) {
        if (userTime) {
            let hourFormat = userTime.hour <= 9 ? ('0' + userTime.hour) : userTime.hour
            let minFormat = userTime.minute <= 9 ? ('0' + userTime.minute) : userTime.minute
            let format = userTime.hour <= 12 ? 'AM' : 'PM'
            if (format == 'PM') {
                hourFormat = hourFormat - 12
                hourFormat = hourFormat <= 9 ? ('0' + hourFormat) : hourFormat
            }
            if (!isFirst) {
                return (hourFormat || 0) + ':' + (minFormat || 0)
            } else {
                return (hourFormat || 0) + ':' + (minFormat || 0) + ' ' + format;
            }
        }
    }

    increaseShow() {
        this.show += 3;
    }

    viewMeetups(data) {
        this.router.navigate(['/meetup', data.id], { queryParams: { 'type': '1' } });
    }

    addToFav(data) {
        this.isClicked = true;
        console.log("hello");
    }

    readNotification(meetup) {
        meetup.background = 'red';
        console.log("hello");
    }
    openPopup() {
       this.displayStyle = "block";
     }
     closePopup() {
       this.displayStyle = "none";
     }


swal(){
  Swal.fire({
    title: 'You need to login in to add a mentor to your wishlist',
     // customClass: 'swal-height',

    showCancelButton: true,
    confirmButtonText: 'Login',
     width: '600px',


    // denyButtonText: `Don't save`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      this.router.navigate(['/profile-authentication']);

    }
  })


}
//

}
