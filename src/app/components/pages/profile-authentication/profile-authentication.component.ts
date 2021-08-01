import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../../_services/helper/helper.service';
import { UserService } from '../../../_services/user/user.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile-authentication',
    templateUrl: './profile-authentication.component.html',
    styleUrls: ['./profile-authentication.component.scss']
})
export class ProfileAuthenticationComponent implements OnInit {
    registerUser: any = {
        email: '',
        password: '',
        phoneNumber: ''
    }
    actionType: any = '';
    isLoading: any = false;

    constructor(
        public helper: HelperService,
        public userService: UserService,
        private route: Router
    ) { }

    ngOnInit(): void { }

    createUser() {
        console.log('am in createUser ', this.registerUser);
        if (!this.registerUser.email || !this.registerUser.password || !this.registerUser.phoneNumber) {
            this.helper.showError('Invalid input !', '3000', 'Enter valid details !');
            return false;
        }
        this.isLoading = true;
        this.actionType = 'register';
        let userData: any = {};
        this.userService.doRegister(this.registerUser)
            .then((authData: any) => {
                userData = {
                    uid: authData.user.uid,
                    email: authData.user.email,
                    phoneNumber: this.registerUser.phoneNumber,
                    registeredOn: moment().format('DD-MM-YYYY hh:mm A')
                }
                return this.userService.updateUser(authData.user.uid, userData)
            })
            .then(() => {
                localStorage.setItem('currentUser', JSON.stringify(userData))
                this.isLoading = false;
                this.registerUser = {
                    email: '',
                    password: '',
                    phoneNumber: ''
                }
                this.helper.showSuccess('Registered successfully !!', '4000');
                this.route.navigate(['/']);
            })
            .catch((err: any) => {
                this.isLoading = false;
                this.helper.showError('Error occurred !');
            })
    }

}
