import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private showDashboardSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}


  showDashboard$ = this.showDashboardSubject.asObservable();

  show() {
    this.showDashboardSubject.next(true);
  }

  fetchLanguageDistribution(): Observable<{ language_distribution: { [key: string]: number } }> {
    return this.http.get<{ language_distribution: { [key: string]: number } }>(`${environment.apiUrl}/language-distribution/`);
  }

  fetchDatasetInfo(): Observable<{ name: string; num_instances: number; num_attributes: number; lang_count: number }> {
    return this.http.get<{ name: string; num_instances: number; num_attributes: number; lang_count: number }>(`${environment.apiUrl}/dataset-info/`);
  }

  fetchToxicityDistribution(): Observable<{ toxicity_distribution: { [key: string]: number } }> {
    return this.http.get<{ toxicity_distribution: { [key: string]: number } }>(`${environment.apiUrl}/toxicity-distribution/`);
  }

  fetchLangNullCount(): Observable<{ null_count: number; percentage: number }> {
    return this.http.get<{ null_count: number; percentage: number }>(`${environment.apiUrl}/lang-null-count/`);
  }

  fetchToxicityNullCount(): Observable<{ null_count: number; percentage: number }> {
    return this.http.get<{ null_count: number; percentage: number }>(`${environment.apiUrl}/toxicity-null-count/`);
  }
}
