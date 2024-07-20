import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientsService } from '../patients.service';
import { Results } from '../results';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-patient-results',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Patient Treatment Results</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <table mat-table [dataSource]="results$()">
          <ng-container matColumnDef="treatment-num">
            <th mat-header-cell *matHeaderCellDef>Treatment Number</th>
            <td mat-cell *matCellDef="let element">{{ element.treatment_num }}</td>
          </ng-container>
          <ng-container matColumnDef="treatment-type">
            <th mat-header-cell *matHeaderCellDef>Treatment Type</th>
            <td mat-cell *matCellDef="let element">{{ element.treatment_type }}</td>
          </ng-container>
          <ng-container matColumnDef="agent">
            <th mat-header-cell *matHeaderCellDef>Agent</th>
            <td mat-cell *matCellDef="let element">{{ element.agent }}</td>
          </ng-container>
          <ng-container matColumnDef="cicles-num">
            <th mat-header-cell *matHeaderCellDef>Cycles Number</th>
            <td mat-cell *matCellDef="let element">{{ element.cicles_num }}</td>
          </ng-container>
          <ng-container matColumnDef="dosage">
            <th mat-header-cell *matHeaderCellDef>Dosage</th>
            <td mat-cell *matCellDef="let element">{{ element.dosage }}</td>
          </ng-container>
          <ng-container matColumnDef="anatomic-size-treatment">
            <th mat-header-cell *matHeaderCellDef>Anatomic Size Treatment</th>
            <td mat-cell *matCellDef="let element">{{ element.anatomic_size_treatment }}</td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" (click)="backToPatients()">
          Back to Patients
        </button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class PatientResultsComponent implements OnInit {
  results$ = this.patientsService.results$;
  displayedColumns: string[] = [
    'treatment-num',
    'treatment-type',
    'agent',
    'cicles-num',
    'dosage',
    'anatomic-size-treatment',
  ];

  constructor(
    private route: ActivatedRoute,
    private patientsService: PatientsService,
    private router: Router // Import Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const patientId = params['patientId'];
      this.patientsService.fetchPatientResults(patientId);
    });
  }

  backToPatients(): void {
    this.router.navigate(['/patients']);
  }
  
}