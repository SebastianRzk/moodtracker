import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Record, RecordsService } from 'src/app/records.service';
import { Topic } from 'src/app/topics.service';

@Component({
  selector: 'app-daily-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit, OnChanges {

  @Input()
  data: Record;

  @Input()
  topic: Topic;

  mainFormGroup: FormGroup;

  constructor(formBuilder: FormBuilder, private recordService: RecordsService) {
    let initialValue = false;
    if (this.data?.boolean) {
      initialValue = this.data.boolean;
    }
    this.mainFormGroup = formBuilder.group({
      booleanField: [initialValue]
    })
   }

  ngOnInit() {
    this.updateValue();
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.updateValue();
  }

  updateValue = () => {
    this.mainFormGroup.patchValue({booleanField: this.data?.boolean ? this.data.boolean : false});
  }

  onUserChanges = (value: string) => {
    if (value == 'on') {
      this.data.boolean = true;
    }else {
      this.data.boolean = false;
    }
    this.recordService.emitChange(this.topic, this.data);
  }
}
