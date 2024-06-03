import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { configUrl } from '../../interface/Constant';

@Injectable({
  providedIn: 'root',
})
export class BdService {
  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get<any>(`${configUrl}/bd-detail/profile`);
  }

  updateProfile(data: any) {
    return this.http.put<any>(`${configUrl}/bd-detail`, data);
  }

  getClient() {
    return this.http.get<any>(`${configUrl}/bd-client`);
  }

  getClientById(id: string) {
    return this.http.get<any>(`${configUrl}/bd-client/${id}`);
  }

  createClient(data: any) {
    return this.http.post<any>(`${configUrl}/bd-client/create`, data);
  }

  deleteClient(id: string) {
    return this.http.delete<any>(`${configUrl}/bd-client/${id}`);
  }

  updateClient(id: string, data: any) {
    return this.http.put<any>(`${configUrl}/bd-client/${id}`, data);
  }

  getVacancy() {
    return this.http.get<any>(`${configUrl}/job-vacancy/all`);
  }

  createVacancy(data: any) {
    return this.http.post<any>(`${configUrl}/job-vacancy/create`, data);
  }

  getVacancyById(id: string) {
    return this.http.get<any>(`${configUrl}/job-vacancy/${id}`);
  }

  updateVacancy(id: string, data: any) {
    return this.http.put<any>(`${configUrl}/job-vacancy/${id}`, data);
  }

  getJobAppByVacancy() {
    return this.http.get<any>(`${configUrl}/t-job-app/job-vacancy`);
  }

  getJobAppById(id: string) {
    return this.http.get<any>(`${configUrl}/t-job-app/${id}`);
  }

  updateJobApp(id: string, data: any) {
    return this.http.put<any>(`${configUrl}/t-job-app/${id}`, data);
  }

  updateVacancyStatus(id: string, data: any) {
    return this.http.put<any>(`${configUrl}/job-vacancy/${id}`, data);
  }

  updateApplicationStatus(id: string, data: any) {
    return this.http.put<any>(`${configUrl}/t-job-app/${id}`, data);
  }

  getVacancyStatus() {
    return this.http.get<any>(`${configUrl}/m-status/vacancy-status`);
  }

  getApplicationStatus() {
    return this.http.get<any>(`${configUrl}/m-status/application-status`);
  }
}
