import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  EmailValidator,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdminService } from '../../service/admin/admin.service';
import { ResumeService } from '../../service/resume/resume.service';
import { AllMasterEnumsService } from '../../service/allMasterEnums/all-master-enums.service';
import { map } from 'rxjs';
import { AuthService } from '../../service/auth/auth.service';
import * as jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';
import { BiodataComponent } from './biodata/biodata.component';
import { ExperienceComponent } from './experience/experience.component';
import { EducationComponent } from './education/education.component';
import { LanguagesSkillComponent } from './languages-skill/languages-skill.component';

@Component({
  selector: 'app-account-view',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DatePipe,
    CommonModule,
    NgFor,
    FormsModule,
    NgIf,
    BiodataComponent,
    ExperienceComponent,
    EducationComponent,
    LanguagesSkillComponent,
  ],
  templateUrl: './account-view.component.html',
  styleUrl: './account-view.component.css',
})
export class AccountViewComponent {}
