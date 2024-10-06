import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {DecimalPipe, PercentPipe} from '@angular/common';
import {NumberFormatPipe} from "../../../pipes/number-format.pipe";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    DecimalPipe, PercentPipe, NumberFormatPipe],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() nullCount: number | null = null;
  @Input() nullPercentage: number | null = null;
  @Input() nullType: string | null = null;

  constructor() {}



}
