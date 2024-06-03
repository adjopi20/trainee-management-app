import { Routes } from '@angular/router';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { TraineeComponent } from './component/dashboards/trainee/trainee.component';
import { CvBuilderComponent } from './component/cv-builder/cv-builder.component';
import { AccountViewComponent } from './component/account-view/account-view.component';
import { GradesComponent } from './component/grades/grades.component';
import { JobApplicantTraineeComponent } from './component/job-applicant-trainee/job-applicant-trainee.component';
import { TrainerComponent } from './component/dashboards/trainer/trainer.component';
import { ListTraineeComponent } from './component/list-trainee/list-trainee.component';
import { AccountTrainerComponent } from './component/account-trainer/account-trainer.component';
import { AnalytycTrainerComponent } from './component/analytyc-trainer/analytyc-trainer.component';
import { BdComponent } from './component/dashboards/bd/bd.component';
import { AccountBdComponent } from './component/account-bd/account-bd.component';
import { AplicationBdComponent } from './component/aplication-bd/aplication-bd.component';
import { AnalytycBdComponent } from './component/analytyc-bd/analytyc-bd.component';
import { AdminComponent } from './component/dashboards/admin/admin.component';
import { VacancyBdComponent } from './component/vacancy-bd/vacancy-bd.component';
import { CreateVacancyComponent } from './component/vacancy-bd/create-vacancy/create-vacancy.component';
import { CreateClientComponent } from './component/client-bd/create-client/create-client.component';
import { ClientBdComponent } from './component/client-bd/client-bd.component';
import { DetailClientComponent } from './component/client-bd/detail-client/detail-client.component';
import { DetailVacancyComponent } from './component/vacancy-bd/detail-vacancy/detail-vacancy.component';
import { UpdateClientComponent } from './component/client-bd/update-client/update-client.component';
import { CreateTraineeComponent } from './component/admin/create-trainee/create-trainee.component';
import { CreateTrainerComponent } from './component/admin/create-trainer/create-trainer.component';
import { CreateBdComponent } from './component/admin/create-bd/create-bd.component';
import { UpdateVacancyComponent } from './component/vacancy-bd/update-vacancy/update-vacancy.component';
import { ListUserComponent } from './component/list-user/list-user.component';
import { DetailAplicationComponent } from './component/aplication-bd/detail-aplication/detail-aplication.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    component: SignInComponent,
  },
  {
    path: 'trainee',
    component: TraineeComponent,
    children: [
      {
        path: '',
        redirectTo: 'job',
        pathMatch: 'full',
      },
      {
        path: 'resume',
        title: 'Trainee | CV BUilder',
        component: CvBuilderComponent,
      },
      {
        path: 'account',
        title: 'Trainee | Account',
        component: AccountViewComponent,
      },
      {
        path: 'grades',
        title: 'Trainee | Grades',
        component: GradesComponent,
      },
      {
        path: 'job',
        title: 'Trainee | Job Applicant',
        component: JobApplicantTraineeComponent,
      },
    ],
  },
  {
    path: 'trainer',
    component: TrainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'accounttrainer',
        pathMatch: 'full',
      },
      {
        path: 'accounttrainer',
        title: 'Trainer | Account',
        component: AccountTrainerComponent,
      },
      {
        path: 'listtrainee',
        title: 'Trainer | List Trainee',
        component: ListTraineeComponent,
      },
      {
        path: 'analytictrainer',
        title: 'Trainer | Analytyc',
        component: AnalytycTrainerComponent,
      },
    ],
  },

  {
    path: 'bd',
    component: BdComponent,
    children: [
      {
        path: '',
        redirectTo: 'accountbd',
        pathMatch: 'full',
      },
      {
        path: 'accountbd',
        title: 'BD | Account',
        component: AccountBdComponent,
      },
      {
        path: 'applicant',
        title: 'BD | Applicant',
        component: AplicationBdComponent,
      },
      {
        path: 'applicant/:id',
        title: 'BD | Applicant Detail',
        component: DetailAplicationComponent,
      },
      {
        path: 'vacancy',
        title: 'BD | Vacancy',
        component: VacancyBdComponent,
      },
      {
        title: 'BD | Create Vacancy',
        path: 'vacancy/create/:id',
        component: CreateVacancyComponent,
      },
      {
        title: 'BD | Detail Vacancy',
        path: 'vacancy/detail/:id',
        component: DetailVacancyComponent,
      },
      {
        title: 'BD | Detail Vacancy',
        path: 'vacancy/detail/:id/update',
        component: UpdateVacancyComponent,
      },
      {
        path: 'client',
        title: 'BD | Client',
        component: ClientBdComponent,
      },
      {
        title: 'BD | Create Client',
        path: 'client/create',
        component: CreateClientComponent,
      },
      {
        title: 'BD | Detail Client',
        path: 'client/detail/:id',
        component: DetailClientComponent,
      },
      {
        title: 'BD | Update Vacancy',
        path: 'client/detail/:id/update',
        component: UpdateClientComponent,
      },
      {
        path: 'analytyc',
        title: 'BD | Applicant',
        component: AnalytycBdComponent,
      },
    ],
  },

  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'CTrainee',
        pathMatch: 'full',
      },
      {
        path: 'CTrainee',
        title: 'admin | Create Traine',
        component: CreateTraineeComponent,
      },
      {
        path: 'CTrainer',
        title: 'admin | Create Trainer',
        component: CreateTrainerComponent,
      },
      {
        path: 'CBd',
        title: 'admin | Create BD',
        component: CreateBdComponent,
      },
      {
        path: 'list-user',
        title: 'admin | List User',
        component: ListUserComponent,
      },
    ],
  },
];
