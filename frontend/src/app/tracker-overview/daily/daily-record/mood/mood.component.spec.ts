import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MODULE_IMPORTS } from 'src/app/app.module';
import { Record } from 'src/app/records.service';
import { Topic } from 'src/app/topics.service';

import { MoodComponent } from './mood.component';

describe('MoodComponent', () => {
  let component: MoodComponent;
  let fixture: ComponentFixture<MoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoodComponent ],
      imports: MODULE_IMPORTS
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodComponent);
    component = fixture.componentInstance;
    component.data = new Record(null);
    component.topic = new Topic();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
