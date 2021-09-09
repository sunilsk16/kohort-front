import { Component, OnInit } from '@angular/core';
import { MentorService } from '../../../_services/mentors/mentor.service';
import * as moment from 'moment';
import * as _ from 'underscore';

@Component({
  selector: 'app-blog-style-one',
  templateUrl: './blog-style-one.component.html',
  styleUrls: ['./blog-style-one.component.scss']
})
export class BlogStyleOneComponent implements OnInit {

  topMentors: any = [];
    show = 4;
    last_index = 100;
    counter = 100;
    showTxt = "Show More";
    firstCount = 100;

  constructor(
    private mentorService: MentorService
  ) { }

  ngOnInit(): void {
    this.mentorService.getAllMentors()
    .then((res: any) =>{
      if(res && res.length){
        // this.topMentors = res;
          this.topMentors = _.reject(res, {'isActive': true});
        console.log('got mentors ', this.topMentors);
      }
    })

  }


 increaseShow() {
   this.show += 4;
 }



}
