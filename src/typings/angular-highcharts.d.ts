declare module 'angular-highcharts' {
  import { Chart } from 'highcharts';
  import { Injectable } from '@angular/core';

  export class Chart {
    constructor(options: any);
  }

  export class HighchartsChartModule {
    static forRoot(): any;
  }
}
