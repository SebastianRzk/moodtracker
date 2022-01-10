import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Record, RecordsService } from 'src/app/records.service';
import { Topic } from 'src/app/topics.service';

@Component({
  selector: 'app-daily-integer',
  templateUrl: './integer.component.html',
  styleUrls: ['./integer.component.css']
})
export class IntegerComponent implements OnInit, OnChanges {
 
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

  onUserChanges = (value: number) => {
    this.data.number = value;
    this.recordService.emitChange(this.topic, this.data);
  }

}
