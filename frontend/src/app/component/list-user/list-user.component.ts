import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AdminService } from '../../service/admin/admin.service';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css',
})
export class ListUserComponent {
  Users: any[] = [];
  constructor(private adminService: AdminService) {}
  ngOnInit() {
    this.GetUsers();
  }

  GetUsers() {
    this.adminService.getUsers().subscribe({
      next: (res) => {
        this.Users = res.data.map((user: any) => {
          return {
            id: user.id,
            email: user.email,
            role: user.role.role,
            createdAt: user.createdAt,
          };
        });
        console.log('Users: ', this.Users);
      },
      error: (err) => {
        console.log('Error get users: ', err);
      },
    });
  }
}
