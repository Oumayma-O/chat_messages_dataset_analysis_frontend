import {ChangeDetectionStrategy, Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PageTitleComponent} from "./components/page-title/page-title.component";
import {UploadOptionsComponent} from "./components/upload-options/upload-options.component";
import {DashboardService} from "./services/dashboard.service";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {CommonModule, NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PageTitleComponent, UploadOptionsComponent, DashboardComponent, NgIf, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  showDashboard = false;

  constructor(private dashboardService: DashboardService) {
    this.dashboardService.showDashboard$.subscribe(show => {
      this.showDashboard = show; // Update the local state
    });
  }}
