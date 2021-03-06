import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MODULE_IMPORTS } from '../app.module';

import { EditTopicsComponent } from './edit-topics.component';

describe('EditTopicsComponent', () => {
  let component: EditTopicsComponent;
  let fixture: ComponentFixture<EditTopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTopicsComponent ],
      imports: MODULE_IMPORTS
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
