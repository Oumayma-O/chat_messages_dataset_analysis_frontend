import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { InfoCardComponent } from './info-card/info-card.component';
import { CommonModule } from '@angular/common';

export interface DatasetCard {
  icon: any;
  topValue: string;
  bottomValue: string;
  color: string;
}

@Component({
  selector: 'app-dataset-info-row',
  standalone: true,
  templateUrl: './dataset-info-row.component.html',
  imports: [InfoCardComponent, CommonModule],
  styleUrls: ['./dataset-info-row.component.css'],

})
export class DatasetInfoRowComponent  {
  @Input() datasetCards: DatasetCard[] = [];

}
