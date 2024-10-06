import {Component, Input} from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgStyle} from "@angular/common";
import {NumberFormatPipe} from "../../../../pipes/number-format.pipe";

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [
    FaIconComponent,
    NgStyle,
    NumberFormatPipe
  ],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.css',

})
export class InfoCardComponent {
  @Input() icon!: IconDefinition;
  @Input() topValue: string = '';
  @Input() bottomValue: string = '';
  @Input() color: string = '';
}
