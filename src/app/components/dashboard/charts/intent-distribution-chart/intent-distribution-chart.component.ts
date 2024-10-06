import {Component, Input, OnInit, ChangeDetectionStrategy, OnChanges} from '@angular/core';
import { Observable } from 'rxjs';
import { CanvasJSAngularChartsModule } from "@canvasjs/angular-charts";

interface IntentData {
  label: string;
  value: number;
}

@Component({
  selector: 'app-intent-distribution-chart',
  standalone: true,
  imports: [CanvasJSAngularChartsModule],
  templateUrl: './intent-distribution-chart.component.html',
  styleUrls: ['./intent-distribution-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntentDistributionChartComponent implements OnChanges {
  @Input() intentData: { [key: string]: number } | null = null;
  @Input() totalTexts: number = 0;
  chartOptions: any;

  private colorPalette: { [key: string]: string } = {
    "Miscellaneous": 'rgb(4, 67, 66)',
    "Summarization": 'rgb(237, 158, 32)',
    "Paraphrasing": 'rgb(126, 5, 5)',
    "Translation": 'rgb(174,11,82)',
    "Role-play": 'rgb(6,83,191)'
  }

  ngOnChanges() {
    if (this.intentData) {
      this.updateChartOptions(this.intentData);
    }
  }
  updateChartOptions(intentData: { [key: string]: number }) {
    const dataPoints: IntentData[] = Object.keys(intentData).map(key => ({
      label: key,
      value: intentData[key]
    }));

    const chartDataPoints = dataPoints.map((item, index) => ({
      name: item.label,
      y: item.value,
      color: this.colorPalette[item.label]
    }));

    this.chartOptions = {
      animationEnabled: true,
      theme: "light2",
      data: [{
        type: "pie",
        indexLabel: "{name}: {y} instances",
        dataPoints: chartDataPoints
      }]
    };
  }
}
