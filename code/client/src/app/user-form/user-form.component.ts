import { Component, effect, EventEmitter, input, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../user';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  styles: `
    .user-form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 2rem;
    }
    .mat-mdc-radio-button ~ .mat-mdc-radio-button {
      margin-left: 16px;
    }
    .mat-mdc-form-field {
      width: 100%;
    }
  `,
  template: `
    <form
      class="user-form"
      autocomplete="off"
      [formGroup]="userForm"
      (submit)="submitForm()"
    >
      <mat-form-field>
        <mat-label>First Name</mat-label>
        <input matInput placeholder="First name" formControlName="firstname" required />
        @if (firstname.invalid) {
        <mat-error>First name is required.</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Last Name</mat-label>
        <input matInput placeholder="Last name" formControlName="lastname" required />
        @if (lastname.invalid) {
        <mat-error>Last name is required.</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Email</mat-label>
        <input matInput placeholder="Email" formControlName="email" required />
        @if (lastname.invalid) {
        <mat-error>Email is required.</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Password</mat-label>
        <input type="password" matInput placeholder="Password" formControlName="password" required/>
        @if (password.invalid) {
        <mat-error>Password must be at least 5 characters long.</mat-error>
        }
      </mat-form-field>
      <br />
      <button
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="userForm.invalid"
      >
        Register
      </button>
      </form>
  `,
})
export class UserFormComponent {
  initialState = input<User>();

  @Output()
  formValuesChanged = new EventEmitter<User>();

  @Output()
  formSubmitted = new EventEmitter<User>();

  userForm = this.formBuilder.group({
    firstname: ['', [Validators.required, Validators.minLength(3)]],
    lastname: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  constructor(private formBuilder: FormBuilder) {
    effect(() => {
      this.userForm.setValue({
        firstname: this.initialState()?.firstname || '',
        lastname: this.initialState()?.lastname || '',
        email: this.initialState()?.email || '',
        password: this.initialState()?.password || '',
      });
    });
  }


  get firstname() {
    return this.userForm.get('firstname')!;
  }
  get lastname() {
    return this.userForm.get('lastname')!;
  }
  get email() {
    return this.userForm.get('email')!;
  }
  get password() {
    return this.userForm.get('password')!;
  }
  submitForm() {
    this.formSubmitted.emit(this.userForm.value as User);
  }
}