import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { configUrl } from '../../interface/Constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  constructor(private http: HttpClient) {}

  //====================education=====================
  createEducation(data: any) {
    return this.http.post<any>(`${configUrl}/trainee-education/create`, data);
  }
  getEducationByTraineeDetail() {
    return this.http.get<any>(`${configUrl}/trainee-education`);
  }
  updateEducation(id: string, data: any): Observable<any> {
    return this.http.put(`${configUrl}/trainee-education/${id}`, data);
  }
  deleteEducation(id: string): Observable<any> {
    return this.http.delete(`${configUrl}/trainee-education/${id}`);
  }

  //====================experience=====================
  createExperience(data: any) {
    return this.http.post<any>(`${configUrl}/trainee-experience/create`, data);
  }
  getExperienceByTraineeDetail() {
    return this.http.get<any>(`${configUrl}/trainee-experience`);
  }
  updateExperience(id: string, data: any): Observable<any> {
    return this.http.put(`${configUrl}/trainee-experience/${id}`, data);
  }
  deleteExperience(id: string): Observable<any> {
    return this.http.delete(`${configUrl}/trainee-experience/${id}`);
  }

  //====================skill=====================
  createSkill(data: any) {
    return this.http.post<any>(`${configUrl}/trainee-skill/create`, data);
  }
  getSkillByTraineeDetail() {
    return this.http.get<any>(`${configUrl}/trainee-skill`);
  }
  updateSkill(id: string, data: any): Observable<any> {
    return this.http.put(`${configUrl}/trainee-skill/${id}`, data);
  }
  deleteSkill(id: string): Observable<any> {
    return this.http.delete(`${configUrl}/trainee-skill/${id}`);
  }
  //====================language=====================
  createLanguage(data: any) {
    return this.http.post<any>(`${configUrl}/trainee-language/create`, data);
  }
  getLanguageByTraineeDetail() {
    return this.http.get<any>(`${configUrl}/trainee-language`);
  }
  updateLanguage(id: string, data: any): Observable<any> {
    return this.http.put(`${configUrl}/trainee-language/${id}`, data);
  }
  deleteLanguage(id: string): Observable<any> {
    return this.http.delete(`${configUrl}/trainee-language/${id}`);
  }
  //====================social-media=====================
  createSocialMedia(data: any) {
    return this.http.post<any>(`${configUrl}/social-media/create  `, data);
  }
  getSocialMediaByTraineeDetail() {
    return this.http.get<any>(`${configUrl}/social-media`);
  }
  updateSocialMedia(id: string, data: any): Observable<any> {
    return this.http.put(`${configUrl}/social-media/${id}`, data);
  }
  deleteSocialMedia(id: string): Observable<any> {
    return this.http.delete(`${configUrl}/social-media/${id}`);
  }

  //====================trainee-detail=====================
  getTraineeDetailById() {
    return this.http.get<any>(`${configUrl}/trainee-detail/profile`);
  }

  updateTraineeDetail(data: any): Observable<any> {
    return this.http.put(`${configUrl}/trainee-detail`, data);
  }
}
