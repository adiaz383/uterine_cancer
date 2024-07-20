import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-prediction-tool',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,  // Import ReactiveFormsModule
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule
  ],
  styles: [
    `
      .form-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
      }
      .form-row {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
      }
      .form-group {
        display: flex;
        flex-direction: column;
        flex: 1;
      }
    `
  ],
  template: `
    <mat-card>
      <mat-card-title>PREDICTION TOOL</mat-card-title>
      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-container">
        <div class="form-row">
          <div class="form-group">
            <label for="patient">SELECT PATIENT</label>
            <mat-select formControlName="patient" placeholder="Select Patient">
              <mat-option *ngFor="let patient of patients" [value]="patient.id">
                {{ patient.name }}
              </mat-option>
            </mat-select>
          </div>
          <div class="form-group">
            <label for="age">Age</label>
            <input matInput formControlName="age" placeholder="Age" />
          </div>
          <div class="form-group">
            <label for="sex">Sex</label>
            <input matInput formControlName="sex" placeholder="Sex" />
          </div>
          <div class="form-group">
            <label for="functionalStatus">Functional Status</label>
            <input matInput formControlName="functionalStatus" placeholder="Functional Status" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="height">Height</label>
            <input matInput formControlName="height" placeholder="Height" />
          </div>
          <div class="form-group">
            <label for="weight">Weight</label>
            <input matInput formControlName="weight" placeholder="Weight" />
          </div>
          <div class="form-group">
            <label for="race">Race</label>
            <input matInput formControlName="race" placeholder="Race" />
          </div>
        </div>
        <!-- Add more form rows and groups here as needed -->
        <button mat-raised-button type="submit" color="primary">Predict Outcome</button>
      </form>
    </mat-card>
  `
})
export class PredictionToolComponent {
  form: FormGroup;
  patients = [
    { id: 1, name: 'Patient 1' },
    { id: 2, name: 'Patient 2' }
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      patient: ['', Validators.required],
      age: ['', Validators.required],
      sex: ['', Validators.required],
      functionalStatus: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      race: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted', this.form.value);
    }
  }
}