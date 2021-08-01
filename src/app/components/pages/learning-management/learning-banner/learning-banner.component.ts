import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../../_services/home/home.service';
import { HelperService } from '../../../../_services/helper/helper.service';
import * as moment from 'moment';

@Component({
  selector: 'app-learning-banner',
  templateUrl: './learning-banner.component.html',
  styleUrls: ['./learning-banner.component.scss']
})

export class LearningBannerComponent implements OnInit {
  user: any = {
    fullName: '',
    email: ''
  }
  isLoading: any = false;

  constructor(
    public homeService: HomeService,
    public helperService: HelperService,
  ) { }

  ngOnInit(): void { }

  submitRequest(){
    if(!this.user.fullName || !this.user.email){
      this.helperService.showError('Invalid input !', '3000', 'Enter Name and Email !');
      return false;
    }
    this.isLoading = true;
    let data = {
      ...this.user,
      created_on: moment().format('DD-MM-YYYY hh:mm A')
    }
    this.homeService.addUserForum(data)
    .then(() =>{
      this.isLoading = false
      this.helperService.showSuccess('Submitted Successfully !!', '3000', 'Thank you !')
      this.user = {
        fullName: '',
        email: ''
      }
    })
    .catch(() =>{
      this.isLoading = false
    })
  }

}
