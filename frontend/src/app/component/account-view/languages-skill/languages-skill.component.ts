import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ResumeService } from '../../../service/resume/resume.service';
import { AllMasterEnumsService } from '../../../service/allMasterEnums/all-master-enums.service';

@Component({
  selector: 'app-languages-skill',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './languages-skill.component.html',
  styleUrl: './languages-skill.component.css',
})
export class LanguagesSkillComponent {
  skills: any[] = [];
  languages: any[] = [];
  availableSkills: any[] = [];
  availableLanguages: any[] = [];

  constructor(
    private resumeService: ResumeService,
    private allMasterEnumsService: AllMasterEnumsService
  ) {}

  ngOnInit(): void {
    this.getSkillByTraineeDetail();
    this.getLanguageByTraineeDetail();
    this.getAvailableLanguages();
    this.getAvailableSkills();
    console.log(this.availableSkills);
  }

  skillForm = new FormGroup({
    skill: new FormControl('', [Validators.required]),
    level: new FormControl('', [Validators.required]),
  });

  LanguageForm = new FormGroup({
    language: new FormControl('', [Validators.required]),
    level: new FormControl('', [Validators.required]),
  });

  createSkill(): void {
    console.log(this.skillForm.value);

    this.resumeService.createSkill(this.skillForm.value).subscribe({
      next: (res) => {
        console.log(res);
        alert(res.message);
        this.skillForm.reset();
        this.getSkillByTraineeDetail();
      },
      error: (error) => {
        console.log(error);
        alert(error.error.message);
      },
    });
  }

  getSkillByTraineeDetail(): void {
    this.resumeService.getSkillByTraineeDetail().subscribe(
      (res) => {
        if (Array.isArray(res.data)) {
          this.skills = res.data.map((skill: any) => {
            return {
              id: skill.id,
              skillId: skill.skill.id,
              skillName: skill.skill,
              level: skill.level,
              isEditing: false,
            };
          });
        } else {
          console.error('Invalid data format:', res);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editSkill(index: number) {
    this.skills[index].isEditing = true;
  }

  saveSkill(index: number): void {
    const updatedSkill = this.skills[index];
    this.resumeService.updateSkill(updatedSkill.id, updatedSkill).subscribe({
      next: (res) => {
        console.log(res);
        alert('Skill updated successfully');
        this.skills[index].isEditing = false;
        this.getSkillByTraineeDetail(); // Refresh the skill list
      },
      error: (error) => {
        console.log(error);
        alert(error.error.message);
      },
    });
  }

  deleteSkill(index: number): void {
    const skillId = this.skills[index].id;
    this.resumeService.deleteSkill(skillId).subscribe({
      next: (res) => {
        console.log(res);
        alert('Skill deleted successfully');
        this.getSkillByTraineeDetail();
      },
      error: (error) => {
        console.log(error);
        alert(error.error.message);
      },
    });
  }

  //============================================Language=============================================
  createLanguage(): void {
    console.log(this.LanguageForm.value);

    this.resumeService.createLanguage(this.LanguageForm.value).subscribe({
      next: (res) => {
        console.log(res);
        alert(res.message);
        this.LanguageForm.reset();
        this.getLanguageByTraineeDetail();
      },
      error: (error) => {
        console.log(error);
        alert(error.error.message);
      },
    });
  }

  getLanguageByTraineeDetail(): void {
    this.resumeService.getLanguageByTraineeDetail().subscribe(
      (res) => {
        console.log(res);

        if (Array.isArray(res.data)) {
          this.languages = res.data.map((language: any) => {
            return {
              id: language.id,
              languageId: language.language.id,
              languageName: language.language,
              level: language.level,
              isEditing: false,
            };
          });
        } else {
          console.error('Invalid data format:', res);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editLanguage(index: number) {
    this.languages[index].isEditing = true;
  }

  saveLanguage(index: number) {
    const updatedLanguage = this.languages[index];
    this.resumeService
      .updateLanguage(updatedLanguage.status, updatedLanguage)
      .subscribe({
        next: (res) => {
          console.log(res);
          alert('Language updated successfully');
          this.languages[index].isEditing = false;
          this.getLanguageByTraineeDetail(); // Refresh the skill list
        },
        error: (error) => {
          console.log(error);
          alert(error.error.message);
        },
      });
  }

  deleteLanguage(index: number): void {
    const languageId = this.languages[index].id;
    this.resumeService.deleteLanguage(languageId).subscribe({
      next: (res) => {
        console.log(res);
        alert('Language deleted successfully');
        this.getLanguageByTraineeDetail();
      },
      error: (error) => {
        console.log(error);
        alert(error.error.message);
      },
    });
  }

  getAvailableSkills(): void {
    this.allMasterEnumsService.getAllSkills().subscribe(
      (res) => {
        console.log(res);

        this.availableSkills = res.data.map((skill: any) => {
          return {
            id: skill.id,
            name: skill.skillName,
          };
        });
        console.log('Transformed availableSkills array:', this.availableSkills); // Check if data is transformed correctly
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadSkills(): void {
    this.resumeService.getSkillByTraineeDetail().subscribe(
      (res: any) => {
        this.skills = res.data;
        console.log(res.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAvailableLanguages(): void {
    this.allMasterEnumsService.getAllLanguages().subscribe(
      (res) => {
        this.availableLanguages = res.data.map((language: any) => {
          return {
            id: language.id,
            name: language.languageName,
          };
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadLanguage(): void {
    this.resumeService.getLanguageByTraineeDetail().subscribe(
      (res: any) => {
        this.skills = res.data;
        console.log(res.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
