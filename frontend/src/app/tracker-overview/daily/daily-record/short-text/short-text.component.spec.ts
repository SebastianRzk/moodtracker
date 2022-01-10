import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Record } from 'src/app/records.service';
import { Topic } from 'src/app/topics.service';
import { MODULE_IMPORTS } from '../../../../app.module';
import { ShortTextComponent } from './short-text.component';

describe('ShortTextComponent', () => {
  let component: ShortTextComponent;
  let fixture: ComponentFixture<ShortTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortTextComponent ],
      imports: MODULE_IMPORTS
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortTextComponent);
    component = fixture.componentInstance;
    component.data = new Record(null);
    component.topic = new Topic();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
