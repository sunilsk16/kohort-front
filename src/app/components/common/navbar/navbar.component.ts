import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    currentUser: any;

    constructor(
        public userService: UserService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        if (localStorage.getItem('currentUser')) {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }
    }

    ngOnChanges() {
        if (localStorage.getItem('currentUser')) {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }
    }

    ngAfterViewInit(): void {
        if (localStorage.getItem('currentUser')) {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }
    }


    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    logout() {
      console.log('am in logout')
        if (localStorage.getItem('currentUser')) {
            this.userService.doLogout().then(res => {
                this.router.navigate(['/']);
            }, err => {
                console.log(err);
            });
        }
    }

}
