import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BdService } from '../../../service/bd/bd.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detail-aplication',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detail-aplication.component.html',
  styleUrl: './detail-aplication.component.css',
})
export class DetailAplicationComponent {
  id!: string;
  application!: any;
  applicationStatus: any[] = [];
  selectedStatusMap: { [key: string]: string } = {};

  constructor(private route: ActivatedRoute, private bdService: BdService) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.bdService.getJobAppByVacancy().subscribe({
      next: (res) => {
        this.application = res.data[this.id];
        console.log(this.application);

        this.getApplicationsbyVacancy(); // Call subsequent requests here
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
        this.applicationStatus = res.data.map((application: any) => ({
          id: application.id,
          status: application.status,
        }));

        // Now that all data is fetched, initialize selectedStatusMap
        this.jobAppByVacancy.forEach((app) => {
          app.jobApp.forEach((application: any) => {
            this.selectedStatusMap[application.id] = application.status;
          });
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  jobAppByVacancy: any[] = [];
  vacancyStatus: any[] = [];

  getApplicationsbyVacancy() {
    this.bdService.getJobAppByVacancy().subscribe({
      next: (res) => {
        console.log(res, 'wasaws');
        this.jobAppByVacancy = res.data;

        this.getVacancyStatus(); // Call the next request here
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
        this.vacancyStatus = res.data.map((vacancy: any) => ({
          id: vacancy.id,
          status: vacancy.status,
        }));

        this.getApplicationStatus(); // Call the final request here
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
    console.log(applicationId);

    const status = this.selectedStatusMap[applicationId];
    console.log(status, 'status');

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
}
