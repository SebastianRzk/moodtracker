import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MODULE_IMPORTS } from 'src/app/app.module';

import { AddActiveTopicComponent } from './add-active-topic.component';

describe('AddActiveTopicComponent', () => {
  let component: AddActiveTopicComponent;
  let fixture: ComponentFixture<AddActiveTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddActiveTopicComponent ],
       imports: MODULE_IMPORTS
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddActiveTopicComponent);
    component = fixture.componentInstance;
    component.name = 'asdf';
    component.order = 2;
    component.selectedType = '2';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
