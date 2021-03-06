import { Component, OnInit } from '@angular/core';
import { MentorService } from '../../../../_services/mentors/mentor.service';
import * as moment from 'moment';
import * as _ from 'underscore';

@Component({
  selector: 'app-learning-courses',
  templateUrl: './learning-courses.component.html',
  styleUrls: ['./learning-courses.component.scss']
})
export class LearningCoursesComponent implements OnInit {
  topMentorsListOne: any = [];
  topMentorsListTwo: any = [];
  topMentorsListThree: any = [];

  constructor(
    private mentorService: MentorService
  ) { }

  ngOnInit(): void {
    this.mentorService.getAllMentors()
    .then((res: any) =>{
      if(res && res.length){
          this.topMentorsListOne = _.reject(res, {'isActive': true}).slice(0,4);
          this.topMentorsListTwo = _.reject(res, {'isActive': true}).slice(5,9);
          this.topMentorsListThree = _.reject(res, {'isActive': true}).slice(10,14);

        // this.topMentors = res.slice(0,4);
        console.log('got mentors ', this.topMentorsListOne);
      }
    })
  }

  getFlag(){
    return 'flag-icon-' + (this.topMentorsListOne.countryCode ) ;
  }

}
