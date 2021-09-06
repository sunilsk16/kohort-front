import { Component, OnInit } from '@angular/core';
import { MeetupService } from '../../../../_services/meetups/meetup.service';
import * as moment from 'moment';

@Component({
  selector: 'app-online-training-courses',
  templateUrl: './online-training-courses.component.html',
  styleUrls: ['./online-training-courses.component.scss']
})
export class OnlineTrainingCoursesComponent implements OnInit {
    show = 6;

  meetupList: any = [];
  constructor(
    public meetupService: MeetupService
  ) { }

  ngOnInit(): void {
    this.meetupService.getAllMeetups()
    .then((res: any) =>{
      console.log('meetups ', res);
      this.meetupList = res;
    })
  }

  getDate(meetupDate: any){
    if(meetupDate) {
      return moment(meetupDate, 'DD-MM-YYYY').format('MMM DD, YYYY')
    } else {
      return ''
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
