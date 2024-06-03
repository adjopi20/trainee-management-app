import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicationBdComponent } from './aplication-bd.component';

describe('AplicationBdComponent', () => {
  let component: AplicationBdComponent;
  let fixture: ComponentFixture<AplicationBdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AplicationBdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AplicationBdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
