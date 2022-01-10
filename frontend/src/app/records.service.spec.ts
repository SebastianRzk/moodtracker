import { TestBed } from '@angular/core/testing';
import { MODULE_IMPORTS } from './app.module';

import { RecordsService } from './records.service';

describe('RecordsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: MODULE_IMPORTS
  }));

  it('should be created', () => {
    const service: RecordsService = TestBed.get(RecordsService);
    expect(service).toBeTruthy();
  });
});
