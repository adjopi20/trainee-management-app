import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesSkillComponent } from './languages-skill.component';

describe('LanguagesSkillComponent', () => {
  let component: LanguagesSkillComponent;
  let fixture: ComponentFixture<LanguagesSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguagesSkillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LanguagesSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
