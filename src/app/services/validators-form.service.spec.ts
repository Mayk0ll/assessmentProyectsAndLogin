import { TestBed } from '@angular/core/testing';

import { ValidatorsFormService } from './validators-form.service';

describe('ValidatorsFormService', () => {
  let service: ValidatorsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidatorsFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
