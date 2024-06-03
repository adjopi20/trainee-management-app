import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTrainerComponent } from './account-trainer.component';

describe('AccountTrainerComponent', () => {
  let component: AccountTrainerComponent;
  let fixture: ComponentFixture<AccountTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountTrainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
