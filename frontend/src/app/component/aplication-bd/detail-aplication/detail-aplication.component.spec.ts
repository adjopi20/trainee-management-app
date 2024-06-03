import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAplicationComponent } from './detail-aplication.component';

describe('DetailAplicationComponent', () => {
  let component: DetailAplicationComponent;
  let fixture: ComponentFixture<DetailAplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailAplicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailAplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
