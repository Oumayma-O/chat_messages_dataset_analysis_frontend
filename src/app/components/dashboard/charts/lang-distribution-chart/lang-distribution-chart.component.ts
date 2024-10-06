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
  imports: [CanvasJSAngularChartsModule], // Import CanvasJS module here
})
export class LangDistributionChartComponent {
  @Input() languageData: { [key: string]: number } = {};

  // Define a color palette to match your cards
  private colorPalette = [
    'rgb(4, 67, 66)', // Color for dataset name
    'rgb(237, 158, 32)', // Color for number of instances
    'rgb(126, 5, 5)', // Color for number of attributes
    'rgb(105, 32, 251)', // Color for number of languages
    // Add more colors as needed
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
        type: "column", // Change type if needed (bar, line, etc.)
        indexLabel: "{y}", // Shows y value on all Data Points
        dataPoints: labels.map((label, index) => ({
          x: index,
          y: dataValues[index],
          label: label, // Use language label
          color: this.colorPalette[index % this.colorPalette.length], // Assign color from the palette
        })),
      }]
    };
  }
}
