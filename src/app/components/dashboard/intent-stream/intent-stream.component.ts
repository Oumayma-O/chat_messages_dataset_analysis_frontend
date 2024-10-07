import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { DecimalPipe, KeyValuePipe, NgForOf, NgIf } from "@angular/common";
import {IntentStreamService} from "../../../services/intent-stream.service";

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
  styleUrls: ['./intent-stream.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntentStreamComponent {
  @Input() currentData: any;  // Data received from the Dashboard
  @Input() distribution: any = {};  // Intent distribution received from the Dashboard
  @Input() totalTexts = 0;
  @Input() streamStarted = false;

  constructor(private intentStreamService: IntentStreamService) { }

  stopStream() {
    this.intentStreamService.stopStream()
      .subscribe(response => {
        if (response) {
          console.log('Stream stopped successfully', response);
        }
      });
  }
}
