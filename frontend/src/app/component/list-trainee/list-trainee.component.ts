import { Component, OnInit } from '@angular/core';
import { TrainerService } from '../../service/trainer/trainer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-trainee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-trainee.component.html',
  styleUrls: ['./list-trainee.component.css'],
})
export class ListTraineeComponent implements OnInit {
  trainees: any[] = [];
  selectedTrainee: any = null;
  editForm: any = {
    id: '',
    firstName: '',
    lastName: '',
    frontendGrade: null,
    backendGrade: null,
    mobileGrade: null,
  };

  constructor(private trainerService: TrainerService) {}

  ngOnInit(): void {
    this.loadTrainees();
  }

  loadTrainees(): void {
    this.trainerService.getListTrainee().subscribe((response) => {
      console.log(response);
      if (response && response.data) {
        this.trainees = response.data;
      }
    });
  }

  getGrade(grades: any[], status: string): string {
    const gradeObj = grades.find((g) => g.status === status);
    return gradeObj ? gradeObj.grade : '-';
  }

  getGradeId(grades: any[], status: string): string | undefined {
    const gradeObj = grades.find((g) => g.status === status);
    return gradeObj ? gradeObj.id : undefined;
  }

  getAverageGrade(grades: any[]): string {
    if (grades.length === 0) return '-';
    const total = grades.reduce((sum, g) => sum + g.grade, 0);
    return (total / grades.length).toFixed(2);
  }

  editTrainee(trainee: any): void {
    this.selectedTrainee = trainee;
    const id = trainee.id || trainee.traineeGrade[0]?.id; // Take ID from traineeGrade if not at root
    this.editForm = {
      traineeDetailId: id,
      firstName: trainee.firstName,
      lastName: trainee.lastName,
      frontendGrade: this.getGrade(trainee.traineeGrade, 'Frontend'),
      backendGrade: this.getGrade(trainee.traineeGrade, 'Backend'),
      mobileGrade: this.getGrade(trainee.traineeGrade, 'Mobile'),
    };
  }

  saveEdit(): void {
    if (!this.editForm.traineeDetailId) {
      Swal.fire('Error', 'Trainee ID is missing!', 'error');
      return;
    }

    const grades = [
      {
        id: this.getGradeId(this.selectedTrainee.traineeGrade, 'Frontend'),
        status: 'Frontend',
        grade: this.editForm.frontendGrade,
      },
      {
        id: this.getGradeId(this.selectedTrainee.traineeGrade, 'Backend'),
        status: 'Backend',
        grade: this.editForm.backendGrade,
      },
      {
        id: this.getGradeId(this.selectedTrainee.traineeGrade, 'Mobile'),
        status: 'Mobile',
        grade: this.editForm.mobileGrade,
      },
    ];

    const createRequests = grades
      .filter((grade) => !grade.id)
      .map((grade) => ({
        traineeDetailId: this.editForm.traineeDetailId,
        status: grade.status,
        grade: grade.grade,
      }));

    const updateRequests = grades
      .filter((grade) => grade.id)
      .map((grade) => ({
        id: grade.id,
        status: grade.status,
        grade: grade.grade,
      }));

    Promise.all([
      ...createRequests.map((req) =>
        this.trainerService.createTraineeGrade(req).toPromise()
      ),
      ...updateRequests.map((req: any) =>
        this.trainerService
          .updateTraineeGrade(req.id, { status: req.status, grade: req.grade })
          .toPromise()
      ),
    ])
      .then((responses) => {
        Swal.fire('Success', 'Trainee grades updated successfully', 'success');
        this.loadTrainees();
        this.selectedTrainee = null;
      })
      .catch((error) => {
        console.log(error);
        Swal.fire('Error', 'Failed to update trainee grades', 'error');
      });
  }
}
