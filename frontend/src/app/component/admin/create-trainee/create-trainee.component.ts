import { Component } from '@angular/core';
import { AdminService } from '../../../service/admin/admin.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-trainee',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-trainee.component.html',
  styleUrls: ['./create-trainee.component.css'],
})
export class CreateTraineeComponent {
  traineeForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    batch: new FormControl(''),
    joinedAt: new FormControl(''),
  });
  constructor(private adminService: AdminService) {}

  ngOnInit() {}

  createTrainee(): void {
    this.adminService.createTrainee(this.traineeForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.traineeForm.reset();
        Swal.fire(
          'Success',
          'Trainee account created successfully!',
          'success'
        );
      },
      error: (error) => {
        console.log(error);
        Swal.fire(
          'Error',
          'There was an error creating the trainee account.',
          'error'
        );
      },
    });
  }
}
