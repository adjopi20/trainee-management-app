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
  selector: 'app-create-trainer',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-trainer.component.html',
  styleUrls: ['./create-trainer.component.css'], // Corrected from styleUrl to styleUrls
})
export class CreateTrainerComponent {
  createTrainerForm!: FormGroup;

  constructor(private adminService: AdminService, private fb: FormBuilder) {
    this.createTrainerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      // date: ['', [Validators.required]], // Correct usage of Validators
      batch: ['', [Validators.required]], // Correct usage of Validators
    });
  }

  createForm(): void {
    if (this.createTrainerForm.invalid) {
      return;
    }
    const trainerData = this.createTrainerForm.value;
    console.log('Data trainer: ', trainerData);

    this.adminService.createTrainer(trainerData).subscribe({
      next: (res) => {
        console.log(res);
        this.createTrainerForm.reset()
        Swal.fire('Success', 'Trainer account created successfully!', 'success');
      },
      error: (err) => {
        console.log('Error create trainer: ', err);
        Swal.fire('Eroor', 'There was an error creating the trainee account.', 'error')
      },
    });
  }
}
