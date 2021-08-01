import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HelperService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router,
    private toastr: ToastrService
  ) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.subject.next();
        }
      }
    });
  }

  success(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'success', text: message });
  }

  showSuccess(message: any, duration?: any,  msg?: any) {
    let title = msg || ''
    this.toastr.success(title, message, { timeOut: (duration || 3000), closeButton: true });
  }

  showError(message: any, duration?: any, msg?: any) {
    let title = msg || ''
    this.toastr.error(title, message, { timeOut: (duration || 3000), closeButton: true });
  }

  error(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: message });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
