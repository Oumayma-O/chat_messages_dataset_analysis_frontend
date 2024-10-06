import { Component, EventEmitter, Output } from '@angular/core';
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { FileUploadService } from '../../services/file-upload.service';
import { NgIf } from "@angular/common";
import { DashboardService } from "../../services/dashboard.service";

@Component({
  selector: 'app-upload-options',
  standalone: true,
  imports: [
    FileUploadComponent,
    NgIf,
  ],
  templateUrl: './upload-options.component.html',
  styleUrls: ['./upload-options.component.css'],
})
export class UploadOptionsComponent {
  showUpload = false;
  @Output() datasetSelected = new EventEmitter<string>();

  constructor( private fileUploadService: FileUploadService, private dashboardService: DashboardService) {}

  onUploadClick() {
    this.showUpload = true;
  }

  onDefaultClick() {
    console.log('Using default dataset...');
    this.fileUploadService.useDefaultDataset().subscribe({
      next: () => {
        this.dashboardService.show();
      },
      error: (error) => {
        alert('Error loading default dataset: ' + error.message);
      },
    });
  }

  onUploadSuccess(): void {
    console.log('File uploaded successfully!');
    this.dashboardService.show();
    this.showUpload = false;
  }
}
