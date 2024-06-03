import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { ResumeService } from '../../../service/resume/resume.service';

@Component({
  selector: 'app-biodata',
  standalone: true,
  imports: [DatePipe, CommonModule, ReactiveFormsModule],
  templateUrl: './biodata.component.html',
  styleUrls: ['./biodata.component.css'],
})
export class BiodataComponent implements OnInit {
  isEditing: boolean = false;
  isEditingBio: boolean = false;
  traineeDetail: any;

  constructor(private resumeService: ResumeService) {}

  traineeDetailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    joinedAt: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
    placeOfBirth: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9-+s()]*$'),
    ]),
  });

  saveTraineeDetail() {
    console.log('====================================');
    console.log(this.traineeDetailForm.errors);
    console.log('====================================');
    if (this.traineeDetailForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields correctly!',
      });
      return;
    }
    this.isEditingBio = false;

    console.log(this.traineeDetailForm.value);

    // You might want to actually save the details using a service here

    this.resumeService
      .updateTraineeDetail(this.traineeDetailForm.value)
      .subscribe((response) => {
        console.log('Trainee detail updated successfully', response);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Trainee details saved successfully!',
        });
      });
  }

  ngOnInit() {
    this.loadTraineeDetail();
  }

  loadTraineeDetail(): void {
    this.resumeService.getTraineeDetailById().subscribe(
      (data) => {
        this.traineeDetail = data.data;

        console.log(
          'Trainee detail retrieved successfully',
          this.traineeDetail
        );

        this.traineeDetailForm.patchValue({
          email: this.traineeDetail.email,
          joinedAt: this.traineeDetail.joinedAt,
          firstName: this.traineeDetail.firstName,
          lastName: this.traineeDetail.lastName,
          dateOfBirth: this.traineeDetail.dateOfBirth,
          placeOfBirth: this.traineeDetail.placeOfBirth,
          phone: this.traineeDetail.phone,
        });
      },
      (error) => {
        console.error('Error retrieving trainee detail', error);
      }
    );
  }

  editBio() {
    this.isEditingBio = true;
  }
}
