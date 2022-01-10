import { TestBed } from '@angular/core/testing';
import { MODULE_IMPORTS } from './app.module';

import { UserService } from './user.service';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: MODULE_IMPORTS
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
