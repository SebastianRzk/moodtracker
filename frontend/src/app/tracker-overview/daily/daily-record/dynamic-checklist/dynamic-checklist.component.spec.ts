import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Record } from 'src/app/records.service';
import { MODULE_IMPORTS } from '../../../../app.module';
import { Topic } from 'src/app/topics.service';

import { DynamicChecklistComponent } from './dynamic-checklist.component';

describe('DynamicChecklistComponent', () => {
  let component: DynamicChecklistComponent;
  let fixture: ComponentFixture<DynamicChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicChecklistComponent ],
      imports: MODULE_IMPORTS
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicChecklistComponent);
    component = fixture.componentInstance;
    component.topic = new Topic();
    component.data = new Record(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
