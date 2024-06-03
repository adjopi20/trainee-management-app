import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdminService } from '../../../service/admin/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-bd',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-bd.component.html',
  styleUrl: './create-bd.component.css',
})
export class CreateBdComponent {
  createBdDorm!: FormGroup;

  constructor(private adminService: AdminService, private fb: FormBuilder) {
    this.createBdDorm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
    });
  }

  createBd(): void {
    if (this.createBdDorm.valid) {
      const bdData = this.createBdDorm.value;
      console.log('Data form BD: ', bdData);

      this.adminService.createBD(bdData).subscribe({
        next: (res) => {
          console.log(res);
          this.createBdDorm.reset()
          Swal.fire('Success', 'BD account created successfully!', 'success')
        },
        error: (err) => {
          console.log('Error create bd: ', err);
          Swal.fire('Error', 'There was an error creating the BD account.', 'error')
        },
      });
    } else {
      console.log('Form tidak valid');
    }
  }
}
