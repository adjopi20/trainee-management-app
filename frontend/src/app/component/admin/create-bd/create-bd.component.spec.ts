import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBdComponent } from './create-bd.component';

describe('CreateBdComponent', () => {
  let component: CreateBdComponent;
  let fixture: ComponentFixture<CreateBdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateBdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
