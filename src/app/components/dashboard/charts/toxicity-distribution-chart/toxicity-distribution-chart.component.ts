import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

export interface ToxicityDistribution {
  [key: string]: number;
}

@Component({
  selector: 'app-toxicity-distribution-chart',
  templateUrl: './toxicity-distribution-chart.component.html',
  styleUrls: ['./toxicity-distribution-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CanvasJSAngularChartsModule],

})
export class ToxicityDistributionChartComponent {
  @Input() toxicityData: ToxicityDistribution = {};

  private colorPalette = [
    'rgb(105, 32, 251)',
    'rgb(126, 5, 5)',
    'rgb(237, 158, 32)',
    'rgb(4, 67, 66)',
    "#c82f0c",
    "#730c2c",
    "#0c62d1",
  ];

  private roundValue(value: number): number {
    return value < 0.01 ? 0 : value;
  }

  get chartOptions() {
    const labels = Object.keys(this.toxicityData);
    const dataValues = Object.values(this.toxicityData).map(this.roundValue); // Apply rounding cuz most of the values are 0.00.

    return {
      animationEnabled: true,
      theme: "dark2",
      axisY: {
        includeZero: true,
        title: "Mean Value",
      },
      axisX: {
        title: "Toxicity Levels",
      },
      data: [{
        type: "column",
        indexLabel: "{y}",
        dataPoints: labels.map((label, index) => ({
          x: index,
          y: dataValues[index],
          label: label.charAt(0).toUpperCase() + label.slice(1).replace(/_/g, ' '),
          color: this.colorPalette[index % this.colorPalette.length],
        })),
      }]
    };
  }
}
