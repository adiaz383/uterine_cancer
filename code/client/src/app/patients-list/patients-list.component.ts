import { Component, OnInit, WritableSignal } from '@angular/core';
import { Patients } from '../patients';
import { PatientsService } from '../patients.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { Router, NavigationEnd } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { filter } from "rxjs";

@Component({
  selector: 'app-patients-list',
  standalone: true,
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule],
  styles: [
    `
      table {
        width: 100%;
        button:first-of-type {
          margin-right: 1rem;
        }
      }

      .scroll-container {
        max-height: 640px; /* Adjust this height as needed */
        overflow-y: auto;
        overflow-x: hidden;
      }

      .button-container {
        display: flex;
        justify-content: space-between;
        padding: 1rem;
      }
    `,
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Patient List</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="scroll-container">
          <table mat-table [dataSource]="patientss$()">
            <ng-container matColumnDef="col-id">
            <th mat-header-cell *matHeaderCellDef>ID</th>
              <td mat-cell *matCellDef="let element">
                <a (click)="viewPerson(element.PATIENT_ID)">{{ element.PATIENT_ID }}</a>
              </td>
            </ng-container>
            <ng-container matColumnDef="col-action">
              <th mat-header-cell *matHeaderCellDef>Action</th>
              <td mat-cell *matCellDef="let element">
                <button mat-raised-button (click)="viewResults(element.PATIENT_ID)">
                  View Treatment
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>
        </div>
      </mat-card-content>
      <mat-card-actions class="button-container">
        <button mat-raised-button color="primary" [routerLink]="['new']">
          Add a New Patient
        </button>
        <button mat-raised-button color="accent" (click)="goToLandingPage()">
          Return to Home
        </button>
        <button mat-raised-button color="accent" (click)="goToPredictionWin()">
          Prediction Tool
        </button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class PatientsListComponent implements OnInit {
  patientss$ = {} as WritableSignal<Patients[]>;
  displayedColumns: string[] = [
    'col-id',
    'col-action',
  ];

  constructor(private patientsService: PatientsService, private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.fetchPatientss();
    });
    this.fetchPatientss();
  }

  private fetchPatientss(): void {
    this.patientss$ = this.patientsService.patientss$;
    this.patientsService.getPatientss();
  }

  viewResults(patientId: string): void {
    this.router.navigate([`/results/${patientId}`]);
  }

  viewPerson(patientId: string): void {
    this.router.navigate([`/view-patient/${patientId}`]);
  }

  goToLandingPage(): void {
    this.router.navigate(['/']);
  }

  goToPredictionWin(): void {
    this.router.navigate(['/prediction-win']);
  }
}