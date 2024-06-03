import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalytycBdComponent } from './analytyc-bd.component';

describe('AnalytycBdComponent', () => {
  let component: AnalytycBdComponent;
  let fixture: ComponentFixture<AnalytycBdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalytycBdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnalytycBdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
