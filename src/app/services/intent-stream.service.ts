import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class IntentStreamService {
  private apiUrl = `${environment.apiUrl}/classify-intents/`; // Your API endpoint

  constructor(private http: HttpClient, private ngZone: NgZone) {}

  getIntentStream(): Observable<any> {
    return new Observable<any>(observer => {
      console.log('Connecting to EventSource at:', this.apiUrl);

      const eventSource = new EventSource(this.apiUrl);

      eventSource.onmessage = (event) => {
        this.ngZone.run(() => {
          const data = JSON.parse(event.data);
          console.log('Parsed data:', data);
          observer.next(data);
        });
      };

      eventSource.onerror = (error) => {
        console.error('Error with EventSource:', error);
        observer.error('EventSource failed: ' + error);
        eventSource.close();
      };

      return () => {
        console.log('Unsubscribing and closing EventSource connection.');
        eventSource.close();
      };
    });
  }

  stopStream(): Observable<any> {
    return this.http.post(`${environment.apiUrl}/stop-stream`, {})
      .pipe(
        catchError(err => {
          console.error('Error stopping stream:', err);
          return of(null); // Handle error gracefully
        })
      );
  }
}
