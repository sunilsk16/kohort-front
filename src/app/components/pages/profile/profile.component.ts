import { Component, OnInit } from '@angular/core';
import { MeetupService } from '../../../_services/meetups/meetup.service';
import { MentorService } from '../../../_services/mentors/mentor.service';
import { ActivatedRoute, Router } from '@angular/router'
import * as moment from 'moment';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    meetupId: any = '';
    meetupData: any;
    reviewsList: any;
    mentorData: any;
    mentorId: any = '';
    imageList: any = [];
    last_index = 70;
    counter = 70;
    showTxt = "Show More";
    firstCount = 70;
    topMentors: any;
    show = 4;

    constructor(
        private meetupService: MeetupService,
        private mentorService: MentorService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        if (this.route.snapshot.params.id) {
            this.mentorId = this.route.snapshot.params.id;
            console.log('got id ', this.mentorId);
            this.mentorService.getMentorsById(this.mentorId)
                .then((res: any) => {
                    this.mentorData = res;
                    this.imageList = res.fileSource || [];
                    // this.imageList = res[index]['fileSource'] || []
                    console.log('got id ', this.imageList);
return this.mentorService.getReviewsBId(this.mentorId)
                })

                    .then((res: any) => {
                        if (res && res.length) {
                            this.reviewsList = res;
                            console.log('gotRecview ', this.reviewsList);
                        }
                    })
            this.mentorService.getAllMentors()
                .then((res: any) => {
                    if (res && res.length) {
                        this.topMentors = res;
                        console.log('got mentors ', this.topMentors);
                    }
                })

            this.last_index = (this.mentorData['achievement'].substring(0, 100)).lastIndexOf(' ');
            if (this.last_index > 70)
                this.last_index = 70;
            this.counter = this.last_index;

        }
    }

    getDate(meetupDate: any) {
        if (meetupDate) {
            return moment(meetupDate, 'DD-MM-YYYY').format('MMM DD, YYYY')
        } else {
            return ''
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

    toggleSkil() {
        if (this.counter < 71) {
            this.counter = this.mentorData.achievement.length;
            this.showTxt = "Show less";
        }
        else {
            this.counter = this.last_index;
            this.showTxt = "Show More"
        }

    }
    increaseShow() {
        this.show += 4;
    }
}
