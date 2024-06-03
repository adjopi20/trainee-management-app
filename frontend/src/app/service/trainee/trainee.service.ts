import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { configUrl } from '../../interface/Constant';

@Injectable({
  providedIn: 'root',
})
export class TraineeService {
  constructor(private http: HttpClient) {}

  getOpenVacancys() {
    return this.http.get<any>(`${configUrl}/job-vacancy/open`);
  }

  applyJobApplication(data: any) {
    return this.http.post<any>(`${configUrl}/t-job-app/create`, data);
  }

  getJobApplicantByVacancyId() {
    return this.http.get<any>(`${configUrl}/t-job-app`);
  }

  getTraineeGrade() {
    return this.http.get<any>(`${configUrl}/trainee-grade/trainee`);
  }
}
