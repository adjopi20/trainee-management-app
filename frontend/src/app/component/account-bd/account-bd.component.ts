import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { BdService } from '../../service/bd/bd.service';
import { UserRole } from '../../interface/Constant';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

interface ResponseBDProfile {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  bdRole: string;
}

interface RequestBDProfile {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  bdRole: string;
}

@Component({
  selector: 'app-account-bd',
  standalone: true,
  imports: [FormsModule, CommonModule, SweetAlert2Module],
  templateUrl: './account-bd.component.html',
  styleUrl: './account-bd.component.css',
})
export class AccountBdComponent {
  profile: ResponseBDProfile = {
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phone: '',
    bdRole: '',
  };

  constructor(private bdService: BdService) {}

  ngOnInit() {
    this.bdService.getProfile().subscribe({
      next: (res: any) => {
        const data = res.data;
        this.profile = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          dateOfBirth: data.dateOfBirth,
          phone: data.phone,
          bdRole: data.bdRole,
        };
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  isEditingBio = false;

  editBio() {
    this.isEditingBio = true;
  }

  saveBio() {
    this.isEditingBio = false;

    this.bdService.updateProfile(this.profile).subscribe({
      next: (res) => {
        Swal.fire({
          text: res.message,
          icon: 'success',
          confirmButtonText: 'OK',
        });
      },
      error: (err) => {
        Swal.fire({
          text: err.message,
          icon: 'success',
          confirmButtonText: 'OK',
        });
      },
    });
  }
}
