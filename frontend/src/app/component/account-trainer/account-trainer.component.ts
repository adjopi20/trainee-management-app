import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { TrainerService } from '../../service/trainer/trainer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account-trainer',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './account-trainer.component.html',
  styleUrls: ['./account-trainer.component.css'],
})
export class AccountTrainerComponent implements OnInit {
  trainerForm!: FormGroup;
  isEditingBio = false;
  initialFormValues: any;
  trainees: any[] = [];

  constructor(
    private fb: FormBuilder,
    private trainerService: TrainerService
  ) {}

  ngOnInit() {
    this.trainerForm = this.fb.group({
      firstName: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, Validators.required],
      role: [{ value: '', disabled: true }, Validators.required],
      batch: [{ value: '', disabled: true }, Validators.required],
    });

    this.trainerService.getProfileTrainer().subscribe((response) => {
      if (response && response.data) {
        this.trainerForm.patchValue({
          firstName: response.data.firstName,
          email: response.data.email,
          role: response.data.role,
          batch: response.data.batch,
        });
        this.initialFormValues = this.trainerForm.value;
      }
    });


    this.trainerService.getListTrainee().subscribe((response) => {
      if(response && response.data) {
        this.trainees = response.data;
      }
    })
  }


  editBio() {
    this.isEditingBio = true;
    this.trainerForm.enable();
  }

  cancelEdit() {
    this.isEditingBio = false;
    this.trainerForm.patchValue(this.initialFormValues);
    this.trainerForm.disable();
  }

  saveBio() {
    if (this.trainerForm.valid) {
      this.trainerService
        .updateProfileTrainer('trainer-id', this.trainerForm.value)
        .subscribe((response) => {
          if (response) {
            Swal.fire({
              icon: 'success',
              title: 'Profile Updated',
              text: 'Your profile has been updated successfully!',
            });
            this.isEditingBio = false;
            this.trainerForm.disable();
            this.initialFormValues = this.trainerForm.value;
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An error occurred while updating your profile. Please try again.',
            });
          }
        });
    }
  }




}
