import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule],
  template: `
    <mat-toolbar color="primary">
      <img src="/fiu-logo.jpg" alt="FIU Logo" class="logo">
      <span class="spacer"></span>
      <a mat-button routerLink="/">Home</a>
      <!--<a mat-button routerLink="/">FAQ</a>
      <a mat-button routerLink="/">About</a>-->
      <a mat-button routerLink="login">Register</a>
      <a mat-button routerLink="login">Login</a>
      <!-- <span class="username" >
        <mat-icon>account_circle</mat-icon>
        Username
      </span> -->
    </mat-toolbar>
  `,
  styles: [`
    .mat-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo {
      height: 160px;
      margin-right: 10px;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .username {
      display: flex;
      align-items: center;
    }
    .username mat-icon {
      margin-right: 5px;
    }
  `]
})
export class HeaderComponent {}
