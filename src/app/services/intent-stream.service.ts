import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntentStreamService {
  private apiUrl = 'http://localhost:8000/classify-intents/'; // Your API endpoint

  constructor(private ngZone: NgZone) {}

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
}
