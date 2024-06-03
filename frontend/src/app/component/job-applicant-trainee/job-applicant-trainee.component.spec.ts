import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicantTraineeComponent } from './job-applicant-trainee.component';

describe('JobApplicantTraineeComponent', () => {
  let component: JobApplicantTraineeComponent;
  let fixture: ComponentFixture<JobApplicantTraineeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobApplicantTraineeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobApplicantTraineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
