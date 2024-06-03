import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { configUrl } from '../../interface/Constant';

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  constructor(private http: HttpClient) {}

  getProfileTrainer(): Observable<any> {
    return this.http.get(`${configUrl}/trainer/profile`).pipe(
      map((response) => {
        console.log(response);
        return response;
      }),

      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }

  updateProfileTrainer(id: string, data: any): Observable<any> {
    return this.http.put(`${configUrl}/trainer/${id}`, data).pipe(
      map((response) => {
        console.log(response);
        return response;
      }),
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }

  getListTrainee(): Observable<any> {
    return this.http.get(`${configUrl}/trainee-grade`).pipe(
      map((response) => {
        return response;
      }),

      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }

  createTraineeGrade(data: any): Observable<any> {
    return this.http.post<any>(`${configUrl}/trainee-grade/create`, data).pipe(
      map((response) => {
        console.log(response);
        return response;
      }),
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }

  updateTraineeGrade(id: string, gradeData: { status: string; grade: number }) {
    console.log(id, gradeData, 'add grade');

    return this.http.put(`${configUrl}/trainee-grade/${id}`, {
      grade: gradeData.grade,
    });
  }

  analytics() {
    return this.http.get(`${configUrl}/trainee-grade/status`);
  }
}
