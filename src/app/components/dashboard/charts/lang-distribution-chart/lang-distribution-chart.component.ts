import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-lang-distribution-chart',
  templateUrl: './lang-distribution-chart.component.html',
  styleUrls: ['./lang-distribution-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CanvasJSAngularChartsModule],
})
export class LangDistributionChartComponent {
  @Input() languageData: { [key: string]: number } = {};

  private colorPalette = [
    'rgb(4, 67, 66)',
    'rgb(237, 158, 32)',
    'rgb(126, 5, 5)',
    'rgb(105, 32, 251)',
  ];

  get chartOptions() {
    const labels = Object.keys(this.languageData);
    const dataValues = Object.values(this.languageData);

    return {
      animationEnabled: true,
      axisY: {
        includeZero: true,
        title: "Number of Instances",
      },
      axisX: {
        title: "Languages",
      },
      data: [{
        type: "column",
        indexLabel: "{y}",
        dataPoints: labels.map((label, index) => ({
          x: index,
          y: dataValues[index],
          label: label,
          color: this.colorPalette[index % this.colorPalette.length],
        })),
      }]
    };
  }
}
