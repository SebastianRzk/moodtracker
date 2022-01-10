import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Record, RecordsService } from 'src/app/records.service';
import { Topic } from 'src/app/topics.service';

@Component({
  selector: 'app-daily-short-text',
  templateUrl: './short-text.component.html',
  styleUrls: ['./short-text.component.css']
})
export class ShortTextComponent implements OnInit, OnChanges {

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
      shortTextField: [initialValue]
    })
   }

  ngOnInit() {
    //this.updateValue();
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.updateValue();
  }


  onUserChanges(text: string) {
    this.data.text = text;
    this.recordService.emitChange(this.topic, this.data);
  }

  updateValue = () => {
    this.mainFormGroup.patchValue({shortTextField: this.data?.text ? this.data.text : ""});
  } 
  
}
