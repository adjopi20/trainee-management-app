import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  token: string | null = localStorage.getItem('token');

  constructor(private router: Router) {}

  ngOnInit() {}

  doLogout() {
    localStorage.clear();
    this.router.navigateByUrl('/signin');
    Swal.fire('Success', 'You have successfully logged out', 'success')
  }
}
