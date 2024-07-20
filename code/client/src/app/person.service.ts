import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from './person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private url = 'http://localhost:5200';
  persons$ = signal<Person[]>([]);
  person$ = signal<Person>({} as Person);

  constructor(private httpClient: HttpClient) { }

  getPersonById(id: string) {
    return this.httpClient.get<Person>(`${this.url}/person/${id}`);
  }
}