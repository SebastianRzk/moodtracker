import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Record } from 'src/app/records.service';
import { Topic } from 'src/app/topics.service';
import { MODULE_IMPORTS } from '../../../../app.module';
import { LongTextComponent } from './long-text.component';

describe('LongTextComponent', () => {
  let component: LongTextComponent;
  let fixture: ComponentFixture<LongTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongTextComponent ],
      imports: MODULE_IMPORTS
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongTextComponent);
    component = fixture.componentInstance;
    component.topic = new Topic();
    component.data = new Record(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
