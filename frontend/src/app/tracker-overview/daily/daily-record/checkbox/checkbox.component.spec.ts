import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Record } from 'src/app/records.service';
import { Topic } from 'src/app/topics.service';
import { MODULE_IMPORTS } from '../../../../app.module';

import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxComponent ],
      imports: MODULE_IMPORTS
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    component.topic = new Topic();
    component.data = new Record(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
