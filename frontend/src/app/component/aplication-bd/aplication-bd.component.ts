import { Component } from '@angular/core';
import { BdService } from '../../service/bd/bd.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-aplication-bd',
  standalone: true,
  imports: [RouterLink, DatePipe, CommonModule, FormsModule],
  templateUrl: './aplication-bd.component.html',
  styleUrl: './aplication-bd.component.css',
})
export class AplicationBdComponent {
  jobAppByVacancy: any[] = [];
  vacancyStatus: any[] = [];
  applicationStatus: any[] = [];
  selectedStatusMap: { [key: string]: string } = {};

  constructor(private bdService: BdService, private router: Router) {}

  ngOnInit(): void {
    this.getApplicationsbyVacancy();
    this.getVacancyStatus();
    this.getApplicationStatus();
    this.applicationStatus;

    this.jobAppByVacancy.forEach((app) => {
      app.jobApp.forEach((application: any) => {
        this.selectedStatusMap[application.id] = application.status;
      });
    });
  }

  getApplicationsbyVacancy() {
    this.bdService.getJobAppByVacancy().subscribe({
      next: (res) => {
        console.log(res, 'wasaws');
        this.jobAppByVacancy = res.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getVacancyStatus() {
    this.bdService.getVacancyStatus().subscribe({
      next: (res) => {
        console.log(res);
        this.vacancyStatus = res.data.map((vacancy: any) => {
          return {
            id: vacancy.id,
            status: vacancy.status,
          };
        });
        console.log(this.jobAppByVacancy);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getApplicationStatus() {
    this.bdService.getApplicationStatus().subscribe({
      next: (res) => {
        console.log(res);
        this.applicationStatus = res.data.map((application: any) => {
          return {
            id: application.id,
            status: application.status,
          };
        });
        console.log(this.jobAppByVacancy);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  saveVacancyStatus(id: string, data: any) {
    this.bdService.updateVacancyStatus(id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.getVacancyStatus();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  saveApplicationStatus(applicationId: string) {
    const status = this.selectedStatusMap[applicationId];
    const data = {
      status: status,
    };

    this.bdService.updateApplicationStatus(applicationId, data).subscribe({
      next: (res) => {
        console.log(res);
        // Optionally, update UI or fetch data again
        // this.getApplicationsbyVacancy();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  viewApplication(index: any) {
    this.router.navigate(['/bd/applicant', index]);
  }
}
