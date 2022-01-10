import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CheckList, CheckListItem, JsonService } from 'src/app/json.service';
import { Record, RecordsService } from 'src/app/records.service';
import { Topic } from 'src/app/topics.service';

@Component({
  selector: 'app-daily-dynamic-checklist',
  templateUrl: './dynamic-checklist.component.html',
  styleUrls: ['./dynamic-checklist.component.css']
})
export class DynamicChecklistComponent implements OnInit, OnChanges {

  @Input()
  topic: Topic;

  @Input()
  data: Record;

  parsedData = new CheckList([]);
  parsedDataOriginal = new CheckList([]);

  constructor(private jsonService: JsonService, private recordService: RecordsService) {
   this.updateValue();
  }

  ngOnInit() {
    this.updateValue();
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.updateValue();
  }

  add = () => {
    this.parsedData.elements.push(new CheckListItem("", false));
    this.parsedDataOriginal.elements.push(new CheckListItem("", false));
  }

  focusOut = (i: number) => {
    let value = this.parsedData.elements[i];
    let origValue = this.parsedDataOriginal.elements[i];

    // Element should be deleted
    if(!value.name) {
      this.parsedData.elements = this.parsedData.elements.filter(obj => obj !== value);
      this.parsedDataOriginal.elements = this.parsedDataOriginal.elements.filter(obj => obj !== origValue);
      this.updateToServer(this.jsonService.toJSON(this.parsedDataOriginal));
      return;
    }

    // Check if updated
    if (value.name != origValue.name) {
      origValue.name = value.name;
      this.updateToServer(this.jsonService.toJSON(this.parsedDataOriginal));
    }
  }

  checked = (i: number, checked: boolean) => {
    this.parsedDataOriginal.elements[i].checked = checked;
    this.parsedData.elements[i].checked = checked;
    this.updateToServer(this.jsonService.toJSON(this.parsedDataOriginal));
  }

  updateToServer = (longText: string) => {
    this.data.text = longText;
    this.recordService.emitChange(this.topic, this.data);
  }

  updateValue = () => {
    if(!this.data) {
      return;
    }
    this.parsedData = this.jsonService.parseChecklistItems(this.data.text)
    this.parsedDataOriginal = this.jsonService.parseChecklistItems(this.data.text)
  }


}
