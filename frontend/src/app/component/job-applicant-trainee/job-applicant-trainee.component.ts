import { Component } from '@angular/core';
import { TraineeService } from '../../service/trainee/trainee.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-job-applicant-trainee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-applicant-trainee.component.html',
  styleUrl: './job-applicant-trainee.component.css',
})
export class JobApplicantTraineeComponent {
  openVacancys: any[] = [];
  reviews: any[] = [];
  vacancyId: string = '';
  statusButton: string = '';

  constructor(private traineeService: TraineeService) {}

  ngOnInit() {
    this.getOpenVacancy();
    this.getJobApplicantByVacancyId();
  }

  getOpenVacancy(): void {
    this.traineeService.getOpenVacancys().subscribe({
      next: (res) => {
        this.openVacancys = res.data.map((vacancy: any) => {
          return {
            vacancyId: vacancy.id,
            position: vacancy.position,
            description: vacancy.description,
            quota: vacancy.quota,
            status: vacancy.status,
            clientName: vacancy.bdClient.clientName,
          };
        });
        console.log('Transformed availableSkills array:', this.openVacancys); // Check if data is transformed correctly
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  applyJob(vacancyId: string): void {
    console.log(vacancyId);

    this.traineeService.applyJobApplication(vacancyId).subscribe(
      (updatedVacancy: any) => {
        const index = this.openVacancys.findIndex(
          (vacancy) => vacancy.id === updatedVacancy.id
        );
        if (index !== -1) {
          this.openVacancys[index].quota = updatedVacancy.quota;
        }
      },
      (error) => {
        console.error('Error applying for job:', error);
      }
    );

    this.traineeService
      .applyJobApplication({ jobVacancyId: vacancyId })
      .subscribe({
        next: (res) => {
          console.log(res);
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Applied successfully',
          });
          this.getJobApplicantByVacancyId();
          this.getOpenVacancy();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  getJobApplicantByVacancyId(): void {
    this.traineeService.getJobApplicantByVacancyId().subscribe({
      next: (res) => {
        console.log(res);
        this.reviews = res.data;
        console.log(this.reviews);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  buttonChanged(id: string): string {
    let status = 'Apply';

    for (let i = 0; i < this.reviews.length; i++) {
      console.log(this.reviews.length);
      if (this.reviews[i]?.jobVacancy?.id === id) {
        status = 'Applied';
      }
    }
    return status;
  }
}
