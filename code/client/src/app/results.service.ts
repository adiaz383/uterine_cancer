import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Results } from './results';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  private url = 'http://localhost:5200';

  constructor(private httpClient: HttpClient) { }

  getResults(patientId: string): Observable<Results[]> {
    return this.httpClient.get<Results[]>(`${this.url}/results/${patientId}`);
  }
}