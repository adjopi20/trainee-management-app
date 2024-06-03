import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { configUrl } from '../../interface/Constant';

@Injectable({
  providedIn: 'root'
})
export class AllMasterEnumsService {
  constructor(private http: HttpClient) {}
    getAllSkills() {
      return this.http.get<any>(`${configUrl}/m-skill`);
    }

    getAllLanguages() {
      return this.http.get<any>(`${configUrl}/m-language`);
    }

    getAllBatches() {
      return this.http.get<any>(`${configUrl}/m-batch`);
    }
      

}
