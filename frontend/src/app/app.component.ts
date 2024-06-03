import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { CvBuilderComponent } from './component/cv-builder/cv-builder.component';
import { TraineeComponent } from './component/dashboards/trainee/trainee.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { LayoutComponent } from './component/layout/layout.component';
import { jwtDecode } from 'jwt-decode';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SignInComponent,
    CvBuilderComponent,
    TraineeComponent,
    LayoutComponent,
    SweetAlert2Module,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  userInfo: { email: string; role: string } | null = null;

  constructor(private router: Router) {
    const userInfoString = localStorage.getItem('userInfo');
    if (userInfoString) {
      try {
        this.userInfo = JSON.parse(userInfoString);
      } catch (error) {
        console.error('Failed to parse userInfo:', error);
        localStorage.removeItem('userInfo');
      }
    }
    if (this.userInfo != null) {
      try {
        if (this.userInfo.role === 'ADMIN') {
          router.navigateByUrl('/admin');
          return;
        }
        if (this.userInfo.role === 'TRAINEE') {
          router.navigateByUrl('/trainee');
          return;
        }
        if (this.userInfo.role === 'TRAINER') {
          router.navigateByUrl('/trainer');
          return;
        }
        if (this.userInfo.role === 'BUSINESS_DEVELOPMENT') {
          router.navigateByUrl('/bd');
          return;
        }
      } catch (error) {
        console.error('Invalid userInfo:', error);
        router.navigateByUrl('/signin');
      }
    } else {
      router.navigateByUrl('/signin');
    }

    console.log(this.userInfo);
  }
}
