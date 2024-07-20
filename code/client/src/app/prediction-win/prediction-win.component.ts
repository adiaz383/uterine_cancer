import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { PatientsService } from '../patients.service';
import { PersonService } from '../person.service';
import { ResultsService } from '../results.service';
import { Router } from '@angular/router';
import { Person } from '../person';
import { Results } from '../results';

@Component({
  selector: 'app-prediction-win',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  styles: [
    `
      .form-container {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
      }
      .form-section {
        flex: 1 1 calc(33% - 1rem);
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        border: 1px solid #ddd;
      }
      mat-card-title {
        font-weight: bold;
      }
      .button-container {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        padding: 1rem;
      }
    `,
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>PREDICTION TOOL</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-container">
          <mat-card class="form-section">
            <mat-card-title>Patient Information</mat-card-title>
            <mat-form-field appearance="outline">
              <mat-label>Select Patient</mat-label>
              <mat-select formControlName="selectPatient" (selectionChange)="onPatientSelect($event.value)">
                <mat-option *ngFor="let patient of patients$()" [value]="patient.PATIENT_ID">
                  {{ patient.PATIENT_ID }}
                </mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Diagnosis Age</mat-label>
              <input matInput formControlName="age" type="number">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Weight</mat-label>
              <input matInput formControlName="weight" type="number">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Race</mat-label>
              <input matInput formControlName="race">
            </mat-form-field>
          </mat-card>

          <mat-card class="form-section">
            <mat-card-title>Current State of Illness</mat-card-title>
            <mat-form-field appearance="outline">
              <mat-label>Cancer Type</mat-label>
              <input matInput formControlName="CANCER_TYPE_DETAILED">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Cancer Grade</mat-label>
              <input matInput formControlName="GRADE">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Tumor Weight </mat-label>
              <input matInput formControlName="TUMOR_WEIGHT" type="number">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>MSI Score</mat-label>
              <input matInput formControlName="MSI_SCORE_MANTIS">
            </mat-form-field>
          </mat-card>

          <mat-card class="form-section">
            <mat-card-title>Other</mat-card-title>
            <mat-form-field appearance="outline">
              <mat-label>Diabetes</mat-label>
              <mat-select formControlName="diabetes">
                <mat-option value="yes">Yes</mat-option>
                <mat-option value="no">No</mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Congestive Heart Failure</mat-label>
              <mat-select formControlName="heartFailure">
                <mat-option value="yes">Yes</mat-option>
                <mat-option value="no">No</mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Hypertension</mat-label>
              <mat-select formControlName="hypertension">
                <mat-option value="yes">Yes</mat-option>
                <mat-option value="no">No</mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Dyspnea</mat-label>
              <mat-select formControlName="dyspnea">
                <mat-option value="yes">Yes</mat-option>
                <mat-option value="no">No</mat-option>
              </mat-select>
            </mat-form-field>
          </mat-card>

          <mat-card class="form-section">
            <mat-card-title>Previous Treatments</mat-card-title>
            <div formArrayName="treatments">
              <div *ngFor="let treatment of getTreatments().controls; let i=index" [formGroupName]="i">
                <mat-form-field appearance="outline">
                  <mat-label>Treatment Type</mat-label>
                  <input matInput formControlName="treatment_type">
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>Agent</mat-label>
                  <input matInput formControlName="agent">
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>Cycles Number</mat-label>
                  <input matInput formControlName="cicles_num" type="number">
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>Dosage</mat-label>
                  <input matInput formControlName="dosage" type="number">
                </mat-form-field>
              </div>
            </div>
          </mat-card>

          <div class="button-container">
            <button mat-raised-button color="primary" type="submit">Predict Outcome</button>
            <button mat-raised-button color="accent" (click)="goBack()">Return to Patient List</button>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  `,
})
export class PredictionWinComponent implements OnInit {
  form: FormGroup;
  patients$ = this.patientsService.patientss$;

  constructor(
    private fb: FormBuilder,
    private patientsService: PatientsService,
    private personService: PersonService,
    private resultsService: ResultsService,
    private router: Router
  ) {
    this.form = this.fb.group({
      selectPatient: [''],
      age: [''],
      weight: [''],
      race: [''],
      CANCER_TYPE_DETAILED: [''],
      GRADE: [''],
      TUMOR_WEIGHT: [''],
      MSI_SCORE_MANTIS: [''],
      diabetes: [''],
      heartFailure: [''],
      hypertension: [''],
      dyspnea: [''],
      treatments: this.fb.array([]),
    });
  }

  getTreatments(): FormArray {
    return this.form.get('treatments') as FormArray;
  }

  ngOnInit(): void {
    this.patientsService.getPatientss();
  }

  onPatientSelect(patientId: string): void {
    this.personService.getPersonById(patientId).subscribe((person: Person) => {
      this.form.patchValue({
        age: person['Diagnosis Age'],
        weight: person['Patient Weight'],
        race: person.Race,
        CANCER_TYPE_DETAILED: person.CANCER_TYPE_DETAILED,
        GRADE: person.GRADE,
        TUMOR_WEIGHT: person.TUMOR_WEIGHT,
        MSI_SCORE_MANTIS: person.MSI_SCORE_MANTIS,
      });
    });

    this.resultsService.getResults(patientId).subscribe((results: Results[]) => {
      const treatmentsArray = this.getTreatments();
      treatmentsArray.clear(); // Clear existing treatments
      results.forEach((result) => {
        const treatmentGroup = this.fb.group({
          treatment_type: [result.treatment_type],
          agent: [result.agent],
          cicles_num: [result.cicles_num],
          dosage: [result.dosage],
        });
        treatmentsArray.push(treatmentGroup);
      });
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }

  goBack(): void {
    this.router.navigate(['/patients']);
  }
}