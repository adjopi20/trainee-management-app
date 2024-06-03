import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  title: string = 'Login';
  subTitle: string = 'Silahkan login menggunakan email dan password anda';
  decoded: any = null;
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', null),
  });
  lock = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (this.loginForm.invalid) {
      Swal.fire('Login failed', 'Pastikan email dan password anda benar', 'error')
      return;
    }

    const data = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService.signIn(data).subscribe(
      (response: any) => {
        if (response.status || response.token != null) {
          localStorage.setItem('token', response.data.token);
          try {
            this.decoded = jwtDecode(response.data.token);
            localStorage.setItem(
              'userInfo',
              JSON.stringify({
                email: response.data.email,
                role: this.decoded.role,
              })
            );
            Swal.fire({
              text: 'Login Success',
              icon: 'success',
              confirmButtonText: 'OK',
            });

            if (this.decoded.role === 'ADMIN') {
              this.router.navigateByUrl('/admin');
              return;
            }
            if (this.decoded.role === 'TRAINEE') {
              this.router.navigateByUrl('/trainee');
              return;
            }
            if (this.decoded.role === 'TRAINER') {
              this.router.navigateByUrl('/trainer');
              return;
            }
            if (this.decoded.role === 'BUSINESS_DEVELOPMENT') {
              this.router.navigateByUrl('/bd');
              return;
            }
          } catch (error) {
            console.error('Token decoding failed', error);
            alert('Token decoding failed');
          }
        } else {
          Swal.fire({
            text: 'Login Failed',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      },
      (err: any) => {
        Swal.fire({
          text: 'Login Failed',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }
}
