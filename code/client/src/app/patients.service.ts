import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patients } from './patients';
import { Results } from './results';


@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  private url = 'http://localhost:5200';
  patientss$ = signal<Patients[]>([]);
  patients$ = signal<Patients>({} as Patients);
  
  //Testing for results
  results$ = signal<Results[]>([]);

  constructor(private httpClient: HttpClient) { }

  private refreshPatientss() {
    this.httpClient.get<Patients[]>(`${this.url}/patients`)
      .subscribe(patientss => {
        this.patientss$.set(patientss);
      });
  }

  getPatientss() {
    this.refreshPatientss();
    return this.patientss$();
  }

  fetchPatientResults(patientId: string) {
    this.httpClient.get<Results[]>(`${this.url}/results/${patientId}`)
      .subscribe(results => {
        this.results$.set(results);
      });
  }
  

}
