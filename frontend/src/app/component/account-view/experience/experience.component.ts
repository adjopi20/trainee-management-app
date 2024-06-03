import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { ResumeService } from '../../../service/resume/resume.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [DatePipe, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent implements OnInit {
  experiences: any[] = [];

  constructor(private resumeService: ResumeService) {}

  ngOnInit() {
    this.getExperienceByTraineeDetail();
  }

  experienceForm = new FormGroup({
    companyName: new FormControl('', [Validators.required]),
    position: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [
      Validators.required,
      // Using ISO date format (YYYY-MM-DD)
    ]),
    endDate: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  createExperience(): void {
    if (this.experienceForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields correctly!',
      });
      return;
    }

    this.resumeService.createExperience(this.experienceForm.value).subscribe({
      next: (res) => {
        console.log(res);
        Swal.fire('Success', 'Experience added successfully', 'success');
        this.experienceForm.reset();
        this.getExperienceByTraineeDetail(); 
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Error', error.error.message, 'error');
      },
    });
  }

  getExperienceByTraineeDetail(): void {
    this.resumeService.getExperienceByTraineeDetail().subscribe(
      (res) => {
        if (Array.isArray(res.data)) {
          this.experiences = res.data.map((experience: any) => ({
            ...experience,
            isEditing: false,
          }));
        } else {
          console.error('Invalid data format:', res);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editExperience(index: number) {
    this.experiences[index].isEditing = true;
  }

  saveExperience(index: number) {
    const updatedExperience = this.experiences[index];
    this.resumeService
      .updateExperience(updatedExperience.id, updatedExperience)
      .subscribe({
        next: (res) => {
          console.log(res);
          Swal.fire('Success', 'Experience updated successfully', 'success');
          this.experiences[index].isEditing = false;
          this.getExperienceByTraineeDetail(); // Refresh the experience list
        },
        error: (error) => {
          console.log(error);
          Swal.fire('Error', error.error.message, 'error');
        },
      });
  }

  deleteExperience(index: number): void {
    const experienceId = this.experiences[index].id;
    this.resumeService.deleteExperience(experienceId).subscribe({
      next: (res) => {
        console.log(res);
        Swal.fire('Success', 'Experience deleted successfully', 'success');
        this.getExperienceByTraineeDetail();
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Error', error.error.message, 'error');
      },
    });
  }
}
