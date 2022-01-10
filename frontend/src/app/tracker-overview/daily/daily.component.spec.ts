import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MODULE_IMPORTS } from 'src/app/app.module';

import { DailyComponent } from './daily.component';

describe('DailyComponent', () => {
  let component: DailyComponent;
  let fixture: ComponentFixture<DailyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyComponent ],
      imports: MODULE_IMPORTS
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
