import { Component, OnInit } from '@angular/core';
import { MeetupService } from '../../../../_services/meetups/meetup.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import * as _ from 'underscore';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-online-training-courses',
  templateUrl: './online-training-courses.component.html',
  styleUrls: ['./online-training-courses.component.scss']
})
export class OnlineTrainingCoursesComponent implements OnInit {
    show = 6;
    liveMeetupList : any = [];

  meetupList: any = [];
  constructor(
    public meetupService: MeetupService,
    public router: Router
  ) { }

  ngOnInit(): void {

this.meetupService.getLiveMeetups()
.then((res : any) => {
  this.liveMeetupList = res;
  console.log("liveMeetupList", res);

})
    this.meetupService.getAllMeetups()
    .then((res: any) =>{
      console.log('meetups ', res);
      this.meetupList = _.reject(res, {'isActive': true});
    })
  }

  getDate(meetupDate: any){
    if(meetupDate) {
      return moment(meetupDate, 'DD-MM-YYYY').format('MMM DD, YYYY')
    } else {
      return ''
    }
  }

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
    if(userTime){
      let hourFormat = userTime.hour <= 9 ? ('0' + userTime.hour) : userTime.hour
      let minFormat = userTime.minute <= 9 ? ('0' + userTime.minute) : userTime.minute
      let format = userTime.hour <= 12 ? 'AM' : 'PM'
      if (format == 'PM') {
        hourFormat = hourFormat - 12
        hourFormat = hourFormat <= 9 ? ('0' + hourFormat) : hourFormat
      }
      if(!isFirst){
        return (hourFormat || 0) + ':' + (minFormat || 0)
      } else {
        return (hourFormat || 0) + ':' + (minFormat || 0) + ' ' + format;
      }
    }
  }

  increaseShow() {
      this.show += 3;
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

}
