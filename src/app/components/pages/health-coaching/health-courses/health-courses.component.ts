import { Component, OnInit } from '@angular/core';
import { MentorService } from '../../../../_services/mentors/mentor.service';

@Component({
    selector: 'app-health-courses',
    templateUrl: './health-courses.component.html',
    styleUrls: ['./health-courses.component.scss']
})
export class HealthCoursesComponent implements OnInit {
    mentorList: any;
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
    constructor( private mentorService: MentorService) { }

    ngOnInit(): void {
      this.mentorService.getAllMentors()
  .then((res:any) =>{
   console.log('mentorList ', res);
     this.mentorList = res;
    })
    }

    bgImage = [
        {
            img: 'assets/img/courses-bg.jpg'
        }
    ]

}
