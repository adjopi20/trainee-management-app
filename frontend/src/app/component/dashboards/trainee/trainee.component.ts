import { Component } from '@angular/core';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AccountViewComponent } from '../../account-view/account-view.component';
import { CvBuilderComponent } from '../../cv-builder/cv-builder.component';
import { AdminService } from '../../../service/admin/admin.service';

@Component({
  selector: 'app-trainee',
  standalone: true,
  imports: [
    SidebarComponent,
    NavbarComponent,
    RouterOutlet,
    AccountViewComponent,
    CvBuilderComponent,
    RouterLink,
  ],
  templateUrl: './trainee.component.html',
  styleUrl: './trainee.component.css',
})
export class TraineeComponent {}
