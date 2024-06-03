import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyBdComponent } from './vacancy-bd.component';

describe('VacancyBdComponent', () => {
  let component: VacancyBdComponent;
  let fixture: ComponentFixture<VacancyBdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VacancyBdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VacancyBdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
