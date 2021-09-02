import { Component, OnInit } from '@angular/core';
import { MentorService } from '../../../../_services/mentors/mentor.service';
import * as moment from 'moment';
import * as _ from 'underscore';

@Component({
    selector: 'app-health-courses',
    templateUrl: './health-courses.component.html',
    styleUrls: ['./health-courses.component.scss']
})
export class HealthCoursesComponent implements OnInit {
    studiesList: any;
    studiesList2: any[];
    selectedValue: any;


    public myEvents: Array<any> = [
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
    constructor(private mentorService: MentorService) {
    }

    ngOnInit(): void {
        // this.studiesList2=this.studiesList

        this.mentorService.getAllStudies()
            .then((res: any) => {
                console.log('studiesList ', res);
                this.studiesList = res;
                return this.studiesList2 = this.studiesList.filter((x: any) => x.name.toLowerCase() == "France".toLowerCase())
            })
        this.selectedValue = 'France'
    }

    bgImage = [
        {
            img: 'assets/img/courses-bg.jpg'
        }
    ]

    getDate(meetupDate: any) {
        if (meetupDate) {
            return moment(meetupDate, 'DD-MM-YYYY').format('MMM DD, YYYY')
        } else {
            return ''
        }
    }

    readableDateFormat(userDate: any) {
        if (!_.isObject(userDate)) {
            return moment(userDate, 'DD-MM-YYYY').format('MMM DD, YYYY')
        }
        else {
            let year = userDate.year;
            let month = userDate.month <= 9 ? '0' + userDate.month : userDate.month;;
            let day = userDate.day <= 9 ? '0' + userDate.day : userDate.day;;
            let finalDate = day + "-" + month + "-" + year;
            return moment(finalDate, 'DD-MM-YYYY').format('MMM DD, YYYY')
        }
    }

    getValue(event) {
        this.studiesList2 = this.studiesList.filter((x: any) => x.name.toLowerCase() == this.selectedValue.toLowerCase())
        console.log('value', this.selectedValue);
    }


    //     getValue(event) {
    //         if(event && event.target) {
    //           this.studiesList2 = this.studiesList._.filter(x => x.name == event.target.value.name)
    //           console.log('value',this.studiesList2);
    //
    //         }
    // }
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

}
