import { Component, EventEmitter, Output } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    NgIf,
  ],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  @Output() uploadSuccess = new EventEmitter<void>();

  constructor( private fileUploadService: FileUploadService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      const fileExtension = this.selectedFile.name.split('.').pop()?.toLowerCase();
      if (['csv', 'json', 'jsonl'].includes(fileExtension!)) {
        console.log('Valid file selected:', this.selectedFile.name);
      } else {
        this.selectedFile = null;
        alert('Please select a valid CSV, JSON, or JSONL file.');
      }
    }
  }

  uploadFile(): void {
    if (this.selectedFile) {
      this.fileUploadService.uploadFile(this.selectedFile).subscribe({
        next: () => {
          console.log('File uploaded successfully!');
          this.uploadSuccess.emit();
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
