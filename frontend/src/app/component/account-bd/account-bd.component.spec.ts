import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountBdComponent } from './account-bd.component';

describe('AccountBdComponent', () => {
  let component: AccountBdComponent;
  let fixture: ComponentFixture<AccountBdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountBdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountBdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
