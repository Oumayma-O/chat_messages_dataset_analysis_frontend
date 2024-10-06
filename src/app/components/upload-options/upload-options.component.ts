import { Component, EventEmitter, Output } from '@angular/core';
import { FileUploadComponent } from "../file-upload/file-upload.component";
import { FileUploadService } from '../../services/file-upload.service';
import { NgIf } from "@angular/common";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DashboardService } from "../../services/dashboard.service";

@Component({
  selector: 'app-upload-options',
  standalone: true,
  imports: [
    FileUploadComponent,
    NgIf,
    HttpClientModule
  ],
  templateUrl: './upload-options.component.html',
  styleUrls: ['./upload-options.component.css'],
})
export class UploadOptionsComponent {
  showUpload = false;
  @Output() datasetSelected = new EventEmitter<string>();

  constructor(private http: HttpClient, private fileUploadService: FileUploadService, private dashboardService: DashboardService) {}

  onUploadClick() {
    this.showUpload = true; // Show the upload component
  }

  onDefaultClick() {
    console.log('Using default dataset...');
    this.fileUploadService.useDefaultDataset().subscribe({
      next: () => {
        this.dashboardService.show(); // Show the dashboard after loading the default dataset
      },
      error: (error) => {
        alert('Error loading default dataset: ' + error.message);
      },
    });
  }

  onUploadSuccess(): void {
    console.log('File uploaded successfully!');
    this.dashboardService.show(); // Show the dashboard after successful upload
    this.showUpload = false; // Optionally hide the upload component
  }
}
