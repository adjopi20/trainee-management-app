import { Component } from '@angular/core';
import { ResumeService } from '../../../service/resume/resume.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css',
})
export class EducationComponent {
  educations: any[] = [];
  constructor(private resumeService: ResumeService) {}

  ngOnInit(): void {
    this.getEducationByTraineeDetail();
  }

  educationForm = new FormGroup({
    institutionName: new FormControl('', [Validators.required]),
    fieldOfStudy: new FormControl('', [Validators.required]),
    graduationYear: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{4}$/),
    ]),
    gpaScore: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(4),
    ]),
  });

  createEducation(): void {
    this.resumeService.createEducation(this.educationForm.value).subscribe({
      next: (res) => {
        alert(res.message);
        this.educationForm.reset();
        this.getEducationByTraineeDetail();
      },
      error: (error) => {
        console.log(error);
        alert(error.error.message);
      },
    });
  }

  getEducationByTraineeDetail(): void {
    this.resumeService.getEducationByTraineeDetail().subscribe(
      (res) => {
        if (Array.isArray(res.data)) {
          this.educations = res.data.map((education: any) => {
            return {
              id: education.id,
              institutionName: education.institutionName,
              fieldOfStudy: education.fieldOfStudy,
              graduationYear: education.graduationYear,
              cgpa: education.cgpa,
              isEditing: false,
            };
          });
        } else {
          console.error('Invalid data format:', res);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editEducation(index: number) {
    this.educations[index].isEditing = true;
  }

  saveEducation(index: number) {
    const updatedEducation = this.educations[index];
    this.resumeService
      .updateEducation(updatedEducation.id, updatedEducation)
      .subscribe({
        next: (res) => {
          console.log(res);
          alert('Education updated successfully');
          this.educations[index].isEditing = false;
          this.getEducationByTraineeDetail(); // Refresh the skill list
        },
        error: (error) => {
          console.log(error);
          alert(error.error.message);
        },
      });
  }

  deleteEducation(index: number): void {
    const educationId = this.educations[index].id;
    this.resumeService.deleteEducation(educationId).subscribe({
      next: (res) => {
        console.log(res);
        alert('Education deleted successfully');
        this.getEducationByTraineeDetail();
      },
      error: (error) => {
        console.log(error);
        alert(error.error.message);
      },
    });
  }
}
