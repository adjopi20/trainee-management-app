import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBdComponent } from './client-bd.component';

describe('ClientBdComponent', () => {
  let component: ClientBdComponent;
  let fixture: ComponentFixture<ClientBdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientBdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientBdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
