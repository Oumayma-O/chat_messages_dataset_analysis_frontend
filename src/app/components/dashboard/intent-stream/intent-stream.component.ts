import { Component, Input } from '@angular/core';
import {DecimalPipe, KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {catchError, of} from "rxjs";
import {environment} from "../../../../environment";

@Component({
  selector: 'app-intent-stream',
  templateUrl: './intent-stream.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    KeyValuePipe,
    DecimalPipe
  ],
  styleUrls: ['./intent-stream.component.css']
})
export class IntentStreamComponent {
  @Input() currentData: any;  // Data received from the Dashboard
  @Input() distribution: any = {};  // Intent distribution received from the Dashboard
  @Input() totalTexts = 0;
  @Input() streamStarted = false; // To track if the stream has started

  constructor(private http: HttpClient) { } // Inject HttpClient

  stopStream() {
    // Call your API to stop the stream
    this.http.post(`${environment.apiUrl}/stop-stream`, {})
      .pipe(
        catchError(err => {
          console.error('Error stopping stream:', err);
          return of(null); // Handle error gracefully
        })
      )
      .subscribe(response => {
        if (response) {
          console.log('Stream stopped successfully', response);
        }
      });
  }

  restartStream() {
    // Call your API to stop the stream
    this.http.post(`${environment.apiUrl}/restart-stream`, {})
      .pipe(
        catchError(err => {
          console.error('Error restarting stream:', err);
          return of(null); // Handle error gracefully
        })
      )
      .subscribe(response => {
        if (response) {
          console.log('Stream restarted successfully', response);
        }
      });
  }


}
