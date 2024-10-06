import {Component, EventEmitter, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {environment} from "../../../environment";

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    NgIf,
    HttpClientModule
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  @Output() uploadSuccess = new EventEmitter<void>();

  constructor(private http: HttpClient) {} // Inject HttpClient


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // Get the file extension
      const fileExtension = this.selectedFile.name.split('.').pop()?.toLowerCase();

      // Check if the selected file is CSV, JSON, or JSONL
      if (['csv', 'json', 'jsonl'].includes(<string>fileExtension)) {
        // The file is valid, proceed with the upload or other operations
        console.log('Valid file selected:', this.selectedFile.name);
      } else {
        this.selectedFile = null; // Reset selected file
        alert('Please select a valid CSV, JSON, or JSONL file.');
      }
    }
  }


  uploadFile(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post(`${environment.apiUrl}/upload-dataset/`, formData).subscribe({
        next: () => {
          console.log('File uploaded successfully!');
          this.uploadSuccess.emit(); // Emit success event
        },
        error: (error) => {
          alert('Error uploading file: ' + error.message);
        },
      });
    } else {
      alert('Please select a file to upload.');
    }
  }

}
