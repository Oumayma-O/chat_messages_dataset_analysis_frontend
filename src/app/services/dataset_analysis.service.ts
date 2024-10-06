import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environment";

export interface DatasetInfo {
  name: string;
  num_instances: number;
  num_attributes: number;
  lang_count: number;
}

@Injectable({
  providedIn: 'root'
})
export class Dataset_analysisService {

  constructor(private http: HttpClient) {}

  getDatasetInfo(): Observable<DatasetInfo> {
    return this.http.get<DatasetInfo>(`${environment.apiUrl}/dataset-info/`);
  }}
