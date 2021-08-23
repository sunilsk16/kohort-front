import { Component, OnInit } from '@angular/core';
import { MeetupService } from '../../../../_services/meetups/meetup.service';

import * as moment from 'moment';

@Component({
  selector: 'app-online-training-about',
  templateUrl: './online-training-about.component.html',
  styleUrls: ['./online-training-about.component.scss']
})
export class OnlineTrainingAboutComponent implements OnInit {
  public myEvents:Array<any> = [
      {
        id: 1,
        eventTitle: ' Conference on  Management',
        description: '',
     },
      {
        id: 2,
        eventTitle: ' Conference on  Education',
        description: '',
      },
      {
        id: 3,
        eventTitle: ' Conference on Special Needs ',
        description: '',
      },
      {
        id: 4,
        eventTitle: ' Conference on  Teaching',
        description: '',
      },
      {
        id: 5,
        eventTitle: ' Conference on  Administration',
        description: '',
      },
      {
        id: 6,
      eventTitle: 'Research Conference Aims ',
      description: '',
    },

  ];

  meetupList: any = [];
  constructor(
    public meetupService: MeetupService
  ) { }

  ngOnInit(): void {
    console.log('res',this.myEvents);
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

}
