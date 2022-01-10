import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Record } from 'src/app/records.service';
import { Topic } from 'src/app/topics.service';
import { MODULE_IMPORTS } from '../../../../app.module';

import { TimeDeltaComponent } from './time-delta.component';

describe('TimeDeltaComponent', () => {
  let component: TimeDeltaComponent;
  let fixture: ComponentFixture<TimeDeltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeDeltaComponent ],
      imports: MODULE_IMPORTS
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeDeltaComponent);
    component = fixture.componentInstance;
    component.topic = new Topic();
    component.data = new Record(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
