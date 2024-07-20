import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',  // Update the selector
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>User DashBoard</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="button-container">
          <button mat-raised-button color="primary" (click)="newPatient()">Add New Patient</button>
          <button mat-raised-button color="accent" [routerLink]="['/patients']">View Patients</button>
          <button mat-raised-button color="warn" (click)="logout()">Logout</button>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    mat-card {
      margin: 20px;
      text-align: center;
    }
    
    mat-card-header {
      display: flex;
      justify-content: center;
      margin-bottom: 40px;
    }

    .button-container {
      display: flex;
      justify-content: center;
      gap: 10px;
    }

    button {
      margin: 10px;
    }
  `]
})
export class DashboardComponent {  // Update the class name
  logout() {
    // Implement logout functionality here
    console.log('Logging out...');
  }
  newPatient() {
    // Placeholder function to prevent any action
    console.log('Add New Patient button clicked');
  }
}