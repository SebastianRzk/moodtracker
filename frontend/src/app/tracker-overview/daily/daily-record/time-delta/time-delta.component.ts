import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Record, RecordsService, Time } from 'src/app/records.service';
import { Topic } from 'src/app/topics.service';

@Component({
  selector: 'app-daily-time-delta',
  templateUrl: './time-delta.component.html',
  styleUrls: ['./time-delta.component.css']
})
export class TimeDeltaComponent implements OnInit, OnChanges {

  @Input()
  topic: Topic;

  @Input()
  data: Record;

  from: string;

  to: string;

  mainFormGroup: FormGroup;

  delta = "";


  constructor(formBuilder: FormBuilder, private recordService: RecordsService) {
    let initialValue = "";
    if (this.data?.text) {
      initialValue = this.data.text;
    }
    this.mainFormGroup = formBuilder.group({
      shortTextField: [initialValue]
    })
   }

  ngOnInit() {
    this.updateValue();
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.updateValue();
  }

  updateValue = () => {
    let minutesDelta = this.getMinutes(this.data.to) - this.getMinutes(this.data.from);
    let hoursDelta = this.getHours(this.data.to) - this.getHours(this.data.from);
    if (minutesDelta < 0) {
      minutesDelta = 60 - minutesDelta;
      hoursDelta = hoursDelta - 1;
    }

    if (hoursDelta < 0) {
      hoursDelta = 24 + hoursDelta;
    }

    this.delta = this.padZero(hoursDelta) + ":" + this.padZero(minutesDelta);
    this.from = this.padZero(this.data.from.hours) + ':' + this.padZero(this.data.from.minutes);
    this.to = this.padZero(this.data.to.hours) + ':' + this.padZero(this.data.to.minutes);
  }

  updateFrom = (time:string) => {
    let timeSplit = time.split(':');
    let minutes = +timeSplit[1];
    let hours = +timeSplit[0];
    if (minutes == this.data.from.minutes && hours == this.data.from.hours){
      return;
    }
    this.data.from.minutes = minutes;
    this.data.from.hours = hours;
    this.updateValue();
    this.updateOnServer();
  }

  updateTo = (time:string) => {
    let timeSplit = time.split(':');
    let minutes = +timeSplit[1];
    let hours = +timeSplit[0];
    if (minutes == this.data.to.minutes && hours == this.data.to.hours){
      return;
    }
    this.data.to.minutes = minutes;
    this.data.to.hours = hours;
    this.updateValue();
    this.updateOnServer();
  }


  updateOnServer = () => {
    this.recordService.emitChange(this.topic, this.data);
  }

  getMinutes = (time:Time) => {
    if (! time) {
      return 0;
    }
    return time.minutes;
  }

  getHours = (time:Time) => {
    if (! time) {
      return 0;
    }
    return time.hours;
  }

  padZero = (n: number) => {
    let text = n + "";
    if(text.length == 1) {
      return "0" + text;
    }
    return text;
  }

}
