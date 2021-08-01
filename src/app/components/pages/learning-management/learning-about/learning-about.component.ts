import { Component, OnInit } from '@angular/core';
import { MentorService } from '../../../../_services/mentors/mentor.service';

@Component({
  selector: 'app-learning-about',
  templateUrl: './learning-about.component.html',
  styleUrls: ['./learning-about.component.scss']
})
export class LearningAboutComponent implements OnInit {
  testiMonialList: any;
  constructor( private mentorService: MentorService) { }

  ngOnInit(): void {
    this.mentorService.getAllTestiMonial()
  .then((res:any) =>{
  console.log('TestiMonial ', res);
   this.testiMonialList = res;
  })
  }

  bgImage = [
      {
          img: 'assets/img/courses-bg.jpg'
      }
  ]

  }
