import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { TrackerOverviewComponent } from './tracker-overview/tracker-overview.component';
import { DailyComponent } from './tracker-overview/daily/daily.component';
import { ThreeDayComponent } from './tracker-overview/three-day/three-day.component';
import { WeekComponent } from './tracker-overview/week/week.component';
import { ShortTextComponent } from './tracker-overview/daily/daily-record/short-text/short-text.component';
import { LongTextComponent } from './tracker-overview/daily/daily-record/long-text/long-text.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { DailyRecordComponent } from './tracker-overview/daily/daily-record/daily-record.component';
import { CheckboxComponent } from './tracker-overview/daily/daily-record/checkbox/checkbox.component';
import { IntegerComponent } from './tracker-overview/daily/daily-record/integer/integer.component';
import { DateChangerComponent } from './tracker-overview/date-changer/date-changer.component';
import { DynamicChecklistComponent } from './tracker-overview/daily/daily-record/dynamic-checklist/dynamic-checklist.component';
import { TimeDeltaComponent } from './tracker-overview/daily/daily-record/time-delta/time-delta.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MoodComponent } from './tracker-overview/daily/daily-record/mood/mood.component';
import { EditTopicsComponent } from './edit-topics/edit-topics.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { AddActiveTopicComponent } from './edit-topics/add-active-topic/add-active-topic.component';
import { HttpClientModule } from '@angular/common/http';

export const MODULE_IMPORTS = [
  BrowserModule,
  BrowserAnimationsModule,
  FormsModule,
  ReactiveFormsModule,
  MatButtonToggleModule,
  MatFormFieldModule,
  MatInputModule,
  MatSidenavModule,
  MatSliderModule,
  MatIconModule,
  MatCardModule,
  MatRadioModule,
  MatCheckboxModule,
  NgxMaterialTimepickerModule,
  RouterModule,
  AppRoutingModule,
  HttpClientModule
]

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    TrackerOverviewComponent,
    DailyComponent,
    ThreeDayComponent,
    WeekComponent,
    ShortTextComponent,
    LongTextComponent,
    DailyRecordComponent,
    CheckboxComponent,
    IntegerComponent,
    DateChangerComponent,
    DynamicChecklistComponent,
    TimeDeltaComponent,
    MoodComponent,
    EditTopicsComponent,
    LoginComponent,
    AddActiveTopicComponent
  ],
  imports: MODULE_IMPORTS,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
