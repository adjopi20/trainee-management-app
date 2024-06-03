import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { configUrl } from '../../interface/Constant';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  constructor(private http: HttpClient) {}

  getStatus() {
    return this.http.get(`${configUrl}/m-status/vacancy-status`);
  }
}
