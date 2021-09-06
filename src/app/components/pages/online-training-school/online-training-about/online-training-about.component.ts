import { Component, OnInit } from '@angular/core';
import { MeetupService } from '../../../../_services/meetups/meetup.service';

import * as moment from 'moment';
import * as _ from 'underscore';

@Component({
  selector: 'app-online-training-about',
  templateUrl: './online-training-about.component.html',
  styleUrls: ['./online-training-about.component.scss']
})
export class OnlineTrainingAboutComponent implements OnInit {
    show = 6;
  meetupList: any = [];
  constructor(
    public meetupService: MeetupService
  ) { }

  ngOnInit(): void {

    this.meetupService.getAllMeetups()
    .then((res: any) =>{
      console.log('meetupsssss ', res);
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
      return userDate;
    } else {
      let year = userDate.year;
      let month = userDate.month <= 9 ? '0' + userDate.month : userDate.month;;
      let day = userDate.day <= 9 ? '0' + userDate.day : userDate.day;;
      let finalDate = day + "-" + month + "-" + year;
      return finalDate;
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

}
