import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAplicationComponent } from './create-aplication.component';

describe('CreateAplicationComponent', () => {
  let component: CreateAplicationComponent;
  let fixture: ComponentFixture<CreateAplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAplicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
