import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CanvasJSAngularChartsModule } from "@canvasjs/angular-charts";

interface IntentData {
  label: string;
  value: number; // Count of instances for the intent
}

@Component({
  selector: 'app-intent-distribution-chart',
  standalone: true,
  imports: [CanvasJSAngularChartsModule],
  templateUrl: './intent-distribution-chart.component.html',
  styleUrls: ['./intent-distribution-chart.component.css']
})
export class IntentDistributionChartComponent implements OnInit, OnChanges {
  @Input() intentData: { [key: string]: number } = {}; // Accepts data from the parent component
  @Input() totalTexts: number = 0; // Total number of texts processed
  chartOptions: any; // Chart options will be set in ngOnInit and updated in ngOnChanges

  private colorPalette: { [key: string]: string } = {
    "Miscellaneous": 'rgb(4, 67, 66)', // Color for dataset name
    "Translation": 'rgb(237, 158, 32)', // Color for number of instances
    "Paraphrasing": 'rgb(126, 5, 5)', // Color for number of attributes
    "Summarization": 'rgb(174,11,82)',
    "Role-play": 'rgb(6,83,191)'// Color for number of languages

  }



  ngOnInit() {
    this.updateChartOptions();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['intentData'] || changes['totalTexts']) {
      this.updateChartOptions(); // Update the chart options whenever intentData or totalTexts changes
    }
  }

  updateChartOptions() {
    // Convert the intentData object to an array of IntentData
    const dataPoints: IntentData[] = Object.keys(this.intentData).map(key => ({
      label: key,
      value: this.intentData[key]
    }));

    // Prepare data points for the chart
    const chartDataPoints = dataPoints.map((item, index) => ({
      name: item.label,
      y: item.value, // Calculate percentage
      color: this.colorPalette[item.label] // Default color if not found
    }));

    this.chartOptions = {
      animationEnabled: true,
      theme: "light2",
      data: [{
        type: "pie", // Change type as needed (column, line, etc.)
        indexLabel: "{name}: {y} instances",
        dataPoints: chartDataPoints
      }]
    };

    console.log('Updated chart options:', this.chartOptions); // Check the updated chart options
  }
}
