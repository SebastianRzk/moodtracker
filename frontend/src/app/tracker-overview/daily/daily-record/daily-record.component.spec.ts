import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Record } from 'src/app/records.service';
import { Topic } from 'src/app/topics.service';
import { MODULE_IMPORTS } from '../../../app.module';
import { DailyRecordComponent } from './daily-record.component';

describe('DailyRecordComponent', () => {
  let component: DailyRecordComponent;
  let fixture: ComponentFixture<DailyRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyRecordComponent ],
      imports: MODULE_IMPORTS
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyRecordComponent);
    component = fixture.componentInstance;
    component.topic = new Topic();
    component.data = new Record(null)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
