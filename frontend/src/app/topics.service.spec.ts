import { TestBed } from '@angular/core/testing';
import { MODULE_IMPORTS } from './app.module';

import { TopicsService } from './topics.service';

describe('TopicsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: MODULE_IMPORTS
  }));

  it('should be created', () => {
    const service: TopicsService = TestBed.get(TopicsService);
    expect(service).toBeTruthy();
  });
});
