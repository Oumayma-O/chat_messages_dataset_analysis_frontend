import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { FormsModule } from "@angular/forms";
import {DecimalPipe, PercentPipe} from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    DecimalPipe, PercentPipe  ],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'], // Fixed styleUrls from styleUrl
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() nullCount: number | null = null; // Number of null values
  @Input() nullPercentage: number | null = null; // Percentage of null values
  @Input() nullType: string | null = null; // Type (Language/Toxicity)

  constructor() {}



}
