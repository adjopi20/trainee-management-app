import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalytycTrainerComponent } from './analytyc-trainer.component';

describe('AnalytycTrainerComponent', () => {
  let component: AnalytycTrainerComponent;
  let fixture: ComponentFixture<AnalytycTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalytycTrainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnalytycTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
