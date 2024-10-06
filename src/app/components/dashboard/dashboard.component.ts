import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatasetInfoRowComponent } from "./dataset-info-row/dataset-info-row.component";
import { LangDistributionChartComponent } from "./charts/lang-distribution-chart/lang-distribution-chart.component";
import { ToxicityDistributionChartComponent } from "./charts/toxicity-distribution-chart/toxicity-distribution-chart.component";
import { IntentDistributionChartComponent } from "./charts/intent-distribution-chart/intent-distribution-chart.component";
import { environment } from "../../../environment";
import { CardComponent } from "./card/card.component";
import {IntentStreamComponent} from "./intent-stream/intent-stream.component";
import {IntentStreamService} from "../../services/intent-stream.service";
import {Subscription} from "rxjs";
import {faClipboardList, faFileAlt, faLanguage, faTable} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    DatasetInfoRowComponent,
    LangDistributionChartComponent,
    ToxicityDistributionChartComponent,
    IntentDistributionChartComponent,
    CardComponent,
    IntentStreamComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit , OnDestroy {
  languageData: { [key: string]: number } = {};
  toxicityData: { [key: string]: number } = {};

  LangNullCount: { count: number; percentage: number } |null =null;
  ToxicityNullCount: { count: number; percentage: number } |null =null;

  public currentData: any;
  public distribution: any = {};
  public subscription!: Subscription;
  public totalTexts = 0;
  public streamStarted = false;
  public streamError = '';


  datasetCards: { icon: any; topValue: string; bottomValue: string; color: string }[] = [];


  constructor(private http: HttpClient , private intentStreamService: IntentStreamService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchDatasetInfo();
    this.fetchLanguageDistribution();
    this.fetchLangNullCount();
    this.fetchToxicityDistribution();
    this.fetchToxicityNullCount();
    this.startIntentStream();
  }



  private fetchLanguageDistribution() {
    this.http.get<{ language_distribution: { [key: string]: number } }>(`${environment.apiUrl}/language-distribution/`)
      .subscribe({
        next: (response) => {
          this.languageData = response.language_distribution;
        },
        error: (error) => {
          console.error('Error fetching language distribution:', error);
        }
      });
  }


  private fetchDatasetInfo() {
    this.http.get<{ name: string; num_instances: number; num_attributes: number; lang_count: number }>(`${environment.apiUrl}/dataset-info/`)
      .subscribe({
        next: (data) => {
          this.datasetCards = [
            {
              icon: faTable,
              topValue: data.name,
              bottomValue: '',
              color: 'rgb(4, 67, 66)'
            },
            {
              icon: faClipboardList,
              topValue: data.num_instances.toString(),
              bottomValue: 'Instances',
              color: 'rgb(237, 158, 32)'
            },
            {
              icon: faFileAlt,
              topValue: data.num_attributes.toString(),
              bottomValue: 'Attributes',
              color: 'rgb(126, 5, 5)'
            },
            {
              icon: faLanguage,
              topValue: data.lang_count.toString(),
              bottomValue: 'Languages',
              color: 'rgb(105, 32, 251)'
            }
          ];
        },
        error: (error) => {
          console.error('Error fetching dataset info:', error);
        }
      });
  }


  private fetchToxicityDistribution() {
    this.http.get<{ toxicity_distribution: { [key: string]: number } }>(`${environment.apiUrl}/toxicity-distribution/`)
      .subscribe({
        next: (response) => {
          console.log('Toxicity distribution response:', response);
          this.toxicityData = response.toxicity_distribution;
        },
        error: (error) => {
          console.error('Error fetching toxicity distribution:', error);
        }
      });
  }

  private fetchLangNullCount() {
    this.http.get<{ null_count: number; percentage: number }>(`${environment.apiUrl}/lang-null-count/`)
      .subscribe({
        next: (response) => {
          this.LangNullCount = { count: response.null_count, percentage: response.percentage }; // Store both count and percentage
        },
        error: (error) => {
          console.error('Error fetching language null count:', error);
        }
      });
  }

  private fetchToxicityNullCount() {
    this.http.get<{ null_count: number; percentage: number }>(`${environment.apiUrl}/toxicity-null-count/`)
      .subscribe({

        next: (response) => {
          console.log('Toxicity Null count:', response);
          this.ToxicityNullCount = { count: response.null_count, percentage: response.percentage }; // Store both count and percentage
        },
        error: (error) => {
          console.error('Error fetching toxicity null count:', error);
        }
      });
  }


  private startIntentStream(): void {
    console.log('Starting the intent classification stream...');
    this.subscription = this.intentStreamService.getIntentStream().subscribe({
      next: (data) => {
        console.log('Data received from stream:', data);
        this.currentData = data;
        this.distribution = data.intent_distribution;
        this.totalTexts = data.total;
        this.streamStarted = true;
        this.cdr.detectChanges(); // Manually trigger change detection
      },
      error: (error) => {
        console.error('Error receiving stream:', error);
        this.streamError = 'Error: ' + error;
      },
      complete: () => {
        console.log('Stream has been completed.');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      console.log('Unsubscribing from the intent stream...');
      this.subscription.unsubscribe();
    }
  }


}
