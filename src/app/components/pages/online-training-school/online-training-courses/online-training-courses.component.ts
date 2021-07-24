import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-online-training-courses',
  templateUrl: './online-training-courses.component.html',
  styleUrls: ['./online-training-courses.component.scss']
})
export class OnlineTrainingCoursesComponent implements OnInit {
  public myEvents:Array<any> = [
      {
        id: 1,
        eventTitle: ' Conference on  Management',
        description: '',
     },
      {
        id: 2,
        eventTitle: ' Conference on  Education',
        description: '',
      },
      {
        id: 3,
        eventTitle: ' Conference on Special Needs ',
        description: '',
      },
      {
        id: 4,
        eventTitle: ' Conference on  Teaching',
        description: '',
      },
      {
        id: 5,
        eventTitle: ' Conference on  Administration',
        description: '',
      },
      {
        id: 6,
      eventTitle: 'Research Conference Aims ',
      description: '',
    },

  ];
  constructor() { }

  ngOnInit(): void {
    console.log('res',this.myEvents);
  }

}
