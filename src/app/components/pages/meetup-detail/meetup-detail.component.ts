import { Component, OnInit ,Input} from '@angular/core';
import { MeetupService } from '../../../_services/meetups/meetup.service';
import { MentorService } from '../../../_services/mentors/mentor.service';
import { ActivatedRoute, Router } from '@angular/router'
import * as moment from 'moment';
import * as _ from 'underscore';

@Component({
  selector: 'app-home',
  templateUrl: './meetup-detail.component.html',
  styleUrls: ['./meetup-detail.component.scss']
})

export class MeetupDetailComponent implements OnInit {
  meetupId: any = '';
  meetupData: any;
  mentorData: any;
  mentorId: any = '';
  isShow: any = true;


  constructor(
    private meetupService: MeetupService,
    private mentorService: MentorService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
      let isArchiveMeetup = window.location.href.split('?type=')[1] ? true : false
      if( isArchiveMeetup === true){
        this.isShow = false
      }

    if (this.route.snapshot.params.id) {
      this.meetupId = this.route.snapshot.params.id;
      console.log('got id ', this.meetupId);
      this.meetupService.getMeetupById(this.meetupId)
      .then((res: any) =>{
        this.meetupData = res;
        this.mentorId = res.mentorId;
        console.log("  this.mentorId",  this.mentorId);

        console.log('meetupData ', res);
        return this.mentorService.getMentorsById(res.mentorId)
      })
      .then((res: any) =>{
        this.mentorData = res;
        console.log('mentorData ', res);
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

  getFlag(){
    return 'flag-icon-' + (this.mentorData.countryCode ) ;
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

}
