import { TestBed } from '@angular/core/testing';
import { MODULE_IMPORTS } from './app.module';

import { HttpWrapperService } from './http-wrapper.service';

describe('HttpWrapperService', () => {
  let service: HttpWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: MODULE_IMPORTS
    });
    service = TestBed.inject(HttpWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
