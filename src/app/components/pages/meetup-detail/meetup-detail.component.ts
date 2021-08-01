import { Component, OnInit } from '@angular/core';
import { MeetupService } from '../../../_services/meetups/meetup.service';
import { ActivatedRoute, Router } from '@angular/router'
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './meetup-detail.component.html',
  styleUrls: ['./meetup-detail.component.scss']
})

export class MeetupDetailComponent implements OnInit {
  meetupId: any = '';
  meetupData: any;

  constructor(
    private meetupService: MeetupService,
    private route: ActivatedRoute,
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
