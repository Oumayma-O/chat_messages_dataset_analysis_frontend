import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

// Adjust the interface to match the API response
export interface ToxicityDistribution {
  [key: string]: number;
}

@Component({
  selector: 'app-toxicity-distribution-chart',
  templateUrl: './toxicity-distribution-chart.component.html',
  styleUrls: ['./toxicity-distribution-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CanvasJSAngularChartsModule], // Import CanvasJS module here

})
export class ToxicityDistributionChartComponent {
  @Input() toxicityData: ToxicityDistribution = {}; // Initialize as an empty object

  // Define a color palette
  private colorPalette = [
    "#c82f0c", // Toxicity
    "#730c2c", // Severe Toxicity
    "#0c62d1", // Obscene
    'rgb(4, 67, 66)', // Color for dataset name
    'rgb(237, 158, 32)', // Color for number of instances
    'rgb(126, 5, 5)', // Color for number of attributes
    'rgb(105, 32, 251)', // Sexual Explicit
  ];

  // Helper function to round values
  private roundValue(value: number): number {
    return value < 0.01 ? 0 : value;
  }

  // Set the chart options based on toxicity data
  get chartOptions() {
    const labels = Object.keys(this.toxicityData);
    const dataValues = Object.values(this.toxicityData).map(this.roundValue); // Apply rounding

    return {
      animationEnabled: true,
      theme: "dark2", // Dark mode theme
      axisY: {
        includeZero: true,
        title: "Mean Value",
      },
      axisX: {
        title: "Toxicity Levels",
      },
      data: [{
        type: "column", // Change type if needed (bar, line, etc.)
        indexLabel: "{y}", // Shows y value on all Data Points
        dataPoints: labels.map((label, index) => ({
          x: index,
          y: dataValues[index],
          label: label.charAt(0).toUpperCase() + label.slice(1).replace(/_/g, ' '), // Format label
          color: this.colorPalette[index % this.colorPalette.length], // Assign color from the palette
        })),
      }]
    };
  }
}
