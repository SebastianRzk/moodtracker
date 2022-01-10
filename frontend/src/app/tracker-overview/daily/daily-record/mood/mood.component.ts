import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Record, RecordsService } from 'src/app/records.service';
import { Topic } from 'src/app/topics.service';

@Component({
  selector: 'app-daily-mood',
  templateUrl: './mood.component.html',
  styleUrls: ['./mood.component.css']
})
export class MoodComponent implements OnInit, OnChanges {

 
  @Input()
  topic: Topic;

  @Input()
  data: Record;

  mainFormGroup: FormGroup;

  constructor(formBuilder: FormBuilder, private recordService: RecordsService) {
    let initialValue = 0;
    if (this.data?.number) {
      initialValue = this.data.number;
    }
    this.mainFormGroup = formBuilder.group({
      intField: [initialValue]
    })
   }

  ngOnInit() {
    this.updateValue();
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.updateValue();
  }

  updateValue = () => {
    this.mainFormGroup.patchValue({intField: this.data?.number ? this.data.number : 0});
  }

  plus = () => {
    this.data.number = this.data.number + 1;
    this.updateValue();
  }

  minus = () => {
    this.data.number = this.data.number -1;
    this.updateValue();
  }

  onChange = (value:number) => {
    this.data.number = value;
    this.updateValue();
    this.publishChangeToServer();
  }

  publishChangeToServer = () => {
    this.data.number = this.mainFormGroup.get('intField').value;
    this.recordService.emitChange(this.topic, this.data);
  }

}
