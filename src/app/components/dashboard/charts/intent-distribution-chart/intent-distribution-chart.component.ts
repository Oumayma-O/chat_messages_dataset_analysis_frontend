import {Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class IntentDistributionChartComponent implements OnInit, OnChanges {
  @Input() intentData: { [key: string]: number } = {};
  @Input() totalTexts: number = 0;
  chartOptions: any;

  private colorPalette: { [key: string]: string } = {
    "Miscellaneous": 'rgb(4, 67, 66)',
    "Translation": 'rgb(237, 158, 32)',
    "Paraphrasing": 'rgb(126, 5, 5)',
    "Summarization": 'rgb(174,11,82)',
    "Role-play": 'rgb(6,83,191)'

  }



  ngOnInit() {
    this.updateChartOptions();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['intentData'] || changes['totalTexts']) {
      this.updateChartOptions();
    }
  }

  updateChartOptions() {
    const dataPoints: IntentData[] = Object.keys(this.intentData).map(key => ({
      label: key,
      value: this.intentData[key]
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

    console.log('Updated chart options:', this.chartOptions);
  }
}
