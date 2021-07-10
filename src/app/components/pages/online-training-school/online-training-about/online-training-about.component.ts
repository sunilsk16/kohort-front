import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-online-training-about',
  templateUrl: './online-training-about.component.html',
  styleUrls: ['./online-training-about.component.scss']
})
export class OnlineTrainingAboutComponent implements OnInit {
  public myEvents:Array<any> = [
      {
        id: 1,
        eventTitle: 'Conference on Discrimination',
        description: '',
     },
      {
        id: 2,
        eventTitle: ' Improvement in Education ',
        description: '',
      },
      {
        id: 3,
        eventTitle: ' Conference on Literacy Teaching',
        description: '',
      },


  ];
  constructor() { }

  ngOnInit(): void {
  }

}
