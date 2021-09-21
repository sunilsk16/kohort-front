import { Component, OnInit } from '@angular/core';
import { MentorService } from '../../../../_services/mentors/mentor.service';
import * as moment from 'moment';
import * as _ from 'underscore';
import { countryList } from '../../../../_services/countryList';
// import { countryList } from '../../services/countryList';

@Component({
    selector: 'app-health-courses',
    templateUrl: './health-courses.component.html',
    styleUrls: ['./health-courses.component.scss']
})
export class HealthCoursesComponent implements OnInit {
    studiesList: any;
    studiesList2: any[];
    selectedValue: any;
    countrylist: any[];
     searchTerm: string = '';
     filteredResult: any[] = [];
    filteredResult2: any[] = [];
    show: 3;

    constructor(private mentorService: MentorService,
        private _countryService: countryList
    ) {
    }

    ngOnInit(): void {

 this.countrylist = this._countryService.getCountrylist();
        this.mentorService.getAllStudies()
            .then((res: any) => {
                console.log('studiesList ', res);
                this.studiesList = res;
                this.filteredResult2= [...new Set(res.map(item => item.name))];
                console.log(this.filteredResult2);
                return this.studiesList2 = this.studiesList.filter((x:any) => x.name.toLowerCase().includes( "France".toLowerCase()))
            })

        // this.selectedValue = 'France'
        // _.groupBy(a,"name")["France"].slice(0,3)
    }
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

    getValue() {
      if(!this.selectedValue || !this.selectedValue.length){
        this.studiesList2 = _.groupBy(this.studiesList, "name")["France"].slice(0, 3)
      } else {
        this.studiesList2 = this.studiesList.filter((x:any) => x.name.toLowerCase().includes( this.selectedValue.toLowerCase())).slice(0,3)
        console.log('value',this.selectedValue);
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
    filterCountryList() {
            if (this.selectedValue && this.selectedValue !== '') {
                let _term = this.selectedValue.toLowerCase();
                this.filteredResult = this.countrylist.filter(function (el: any) {
                    return el.name.toLowerCase().indexOf(_term.toLowerCase()) > -1;
                });
            } else {
                this.filteredResult = [];
            }
        }

        //set selected country
        selectCountry(name) {
            this.selectedValue = name;
            this.filteredResult = [];
        }

        increaseShow() {
          this.show += 3;
        }

}
