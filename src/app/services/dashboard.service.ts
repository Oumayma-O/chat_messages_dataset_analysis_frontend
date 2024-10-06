import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private showDashboardSubject = new BehaviorSubject<boolean>(false);
  showDashboard$ = this.showDashboardSubject.asObservable();

  show() {
    this.showDashboardSubject.next(true);
  }

  hide() {
    this.showDashboardSubject.next(false);
  }
}
