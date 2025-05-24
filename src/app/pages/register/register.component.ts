import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../models/iuser';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errorMessage: string = '';

  registerForm = new FormGroup({
    full_name: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl<string>('', [Validators.required]),
    phone: new FormControl<string>('', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]),
    age: new FormControl<number>(18, [Validators.required, Validators.min(12), Validators.max(75)]),
    gender: new FormControl<string>('male', [Validators.required])
  }, {
    validators: (control: AbstractControl) => {
      const formGroup = control as FormGroup;
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { mismatch: true };
    }
  });

  get getFullName() { return this.registerForm.controls['full_name']; }
  get getEmail() { return this.registerForm.controls['email']; }
  get getPassword() { return this.registerForm.controls['password']; }
  get getConfirmPassword() { return this.registerForm.controls['confirmPassword']; }
  get getPhone() { return this.registerForm.controls['phone']; }
  get getAge() { return this.registerForm.controls['age']; }
  get getGender() { return this.registerForm.controls['gender']; }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  /* private passwordMatchValidator: ValidatorFn = (control: AbstractControl) => {
    const formGroup = control as FormGroup;
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  } */

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const formValue = this.registerForm.value;

    const newUser: IUser = {
      full_name: formValue.full_name!,
      email: formValue.email!,
      password: formValue.password!,
      phone: formValue.phone!,
      age: formValue.age!,
      gender: formValue.gender!,
      todos: []
    };

    this.authService.register(newUser).subscribe({
      next: (user) => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = 'Registration failed. Please try again.';
        console.error(err);
      }
    });
  }
}