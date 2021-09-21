import { Component, OnInit } from '@angular/core';
import { MentorService } from '../../../_services/mentors/mentor.service';
import * as _ from 'underscore';

@Component({
    selector: 'app-about-style-one',
    templateUrl: './about-style-one.component.html',
    styleUrls: ['./about-style-one.component.scss']
})
export class AboutStyleOneComponent implements OnInit {

  testiMonialList: any;
  constructor( private mentorService: MentorService) { }

  ngOnInit(): void {
    this.mentorService.getAllTestiMonial()
  .then((res:any) =>{
  console.log('TestiMonial ', res);
  this.testiMonialList = _.reject(res, {'isActive': true}).slice(0,6);;

  })
  }

  bgImage = [
      {
          img: 'assets/img/courses-bg.jpg'
      }
  ]

  }
