import { Component, OnInit } from '@angular/core';
import { MentorService } from '../../../../_services/mentors/mentor.service';
import * as moment from 'moment';
import * as _ from 'underscore';

@Component({
  selector: 'app-health-events',
  templateUrl: './health-events.component.html',
  styleUrls: ['./health-events.component.scss']
})
export class HealthEventsComponent implements OnInit {
  studiesList: any;
  studiesList2: any [];
  selectedValue: any;


public myEvents:Array<any> = [
    {
      id: 1,
      mentorTitle: ' Alex Morgan',
      about: '',
   },
    {
      id: 2,
      mentorTitle: ' Kirill Eremenko',
      about: '',
    },
    {
      id: 3,
      mentorTitle: ' Ben Tristem ',
      about: '',
    },
    {
      id: 4,
      mentorTitle: ' Jose Portilla',
      about: '',
    },
    {
      id: 5,
      mentorTitle: ' Daragh Walsh',
      about: '',
    },
    {
      id: 6,
    mentorTitle: ' Hadelin  ',
    about: '',
  },

];
  constructor( private mentorService: MentorService) {
}

  ngOnInit(): void {
    this.mentorService.getAllLanguage()
.then((res:any) =>{
 console.log('studiesList ', res);
   this.studiesList = res;
  return this.studiesList2 = this.studiesList.filter((x:any) => x.name.toLowerCase().includes( "German".toLowerCase()))
  })
  }

  bgImage = [
      {
          img: 'assets/img/courses-bg.jpg'
      }
  ]

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

getValue() {
  if(!this.selectedValue || !this.selectedValue.length){
    this.studiesList2 = _.groupBy(this.studiesList, "name")["German"].slice(0, 3)
  } else {
    this.studiesList2 = this.studiesList.filter((x:any) => x.name.toLowerCase().includes( this.selectedValue.toLowerCase()))
    console.log('value',this.selectedValue);
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
