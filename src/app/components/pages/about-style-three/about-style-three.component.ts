import { Component, OnInit } from '@angular/core';
import { MentorService } from '../../../_services/mentors/mentor.service';


@Component({
  selector: 'app-about-style-three',
  templateUrl: './about-style-three.component.html',
  styleUrls: ['./about-style-three.component.scss']
})
export class AboutStyleThreeComponent implements OnInit {
  testiMonialList: any;
  topMentors: any;
  show: 4;
  constructor( private mentorService: MentorService) { }

  ngOnInit(): void {
    this.mentorService.getAllTestiMonial()
  .then((res:any) =>{
  console.log('TestiMonial ', res);
   this.testiMonialList = res;
  })
  this.mentorService.getAllMentors()
  .then((res: any) =>{
    if(res && res.length){
      this.topMentors = res;
      console.log('got mentors ', this.topMentors);
    }
  })
  }

  bgImage = [
      {
          img: 'assets/img/courses-bg.jpg'
      }
  ]

  increaseShow() {
    this.show += 4;
  }


  }
