import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { PatientResultsComponent } from './results-list/results-list.component';
import { LoginComponent } from './pages/login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PredictionToolComponent } from './prediction-tool/prediction-tool.component';
import { PredictionWinComponent } from './prediction-win/prediction-win.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent, title: 'Home' }, // Home route
  { path: 'dashboard', component: DashboardComponent, title: 'Home' },
  { path: 'patients', component: PatientsListComponent, title: 'Patients ID List' },
  { path: 'results/:patientId', component: PatientResultsComponent, title: 'Results' }, // Add the results route
  { path: 'login', component:LoginComponent, title: 'Login' },
  { path: 'prediction-tool', component: PredictionToolComponent, title: 'Prediction Tool' },
  { path: 'prediction-win', component: PredictionWinComponent },
  { path: '**', redirectTo: 'patients' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}