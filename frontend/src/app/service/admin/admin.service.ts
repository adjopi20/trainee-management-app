import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { configUrl } from '../../interface/Constant';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  createTrainee(data: any) {
    return this.http.post<any>(`${configUrl}/trainee-detail/create`, data);
  }

  createTrainer(data: any) {
    return this.http.post<any>(`${configUrl}/trainer/create`, data);
  }

  createBD(data: any) {
    return this.http.post<any>(`${configUrl}/bd-detail/create`, data);
  }

  getUsers() {
    return this.http.get<any>(`${configUrl}/auth/users`);
  }
}
