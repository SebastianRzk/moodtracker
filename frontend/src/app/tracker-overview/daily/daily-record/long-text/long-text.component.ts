import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateService } from 'src/app/date.service';
import { Record, RecordsService } from 'src/app/records.service';
import { Topic } from 'src/app/topics.service';

@Component({
  selector: 'app-daily-long-text',
  templateUrl: './long-text.component.html',
  styleUrls: ['./long-text.component.css']
})
export class LongTextComponent implements OnInit, OnChanges {

  @Input()
  topic: Topic;

  @Input()
  data: Record;

  mainFormGroup: FormGroup;


  constructor(formBuilder: FormBuilder, private recordService: RecordsService) {
    let initialValue = "";
    if (this.data?.text) {
      initialValue = this.data.text;
    }
    this.mainFormGroup = formBuilder.group({
      longTextField: [initialValue]
    })
   }

  ngOnInit() {
    this.updateValue();
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.updateValue();
  }

  updateValue = () => {
    this.mainFormGroup.patchValue({longTextField: this.data?.text ? this.data.text : ""});
  }

  onUserChanges = (value: string) => {
    this.data.text = value;
    this.recordService.emitChange(this.topic, this.data);
  }


}
