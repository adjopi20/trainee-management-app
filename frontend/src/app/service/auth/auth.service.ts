import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { configUrl } from '../../interface/Constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  signIn(body: any) {
    return this.httpClient.post(`${configUrl}/auth/signin`, body);
  }
}
