import { TestBed } from '@angular/core/testing';

import { JsonService } from './json.service';

describe('JsonService', () => {
  let service: JsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shoud parse valid checklists', () => {
    let records = service.parseChecklistItems("{\"elements\": [{\"name\": \"check 1\", \"checked\": false},{\"name\": \"check 2\", \"checked\": true}]}")
    expect(records.elements.length).toEqual(2)
    expect(records.elements[0].name).toEqual("check 1")
    expect(records.elements[0].checked).toEqual(false)
    expect(records.elements[1].name).toEqual("check 2")
    expect(records.elements[1].checked).toEqual(true)
  });

  it('shoud not parse invalid checklist, should return default', () => {
    let records = service.parseChecklistItems("{\"not_elements\": [{\"name\": \"check 1\", \"checked\": false},{\"name\": \"check 2\", \"checked\": true}]}")
    expect(records.elements.length).toEqual(0)
  });
});
