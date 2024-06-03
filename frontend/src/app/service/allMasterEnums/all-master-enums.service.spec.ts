import { TestBed } from '@angular/core/testing';

import { AllMasterEnumsService } from './all-master-enums.service';

describe('AllMasterEnumsService', () => {
  let service: AllMasterEnumsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllMasterEnumsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
