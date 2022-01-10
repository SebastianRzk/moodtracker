import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tracker-overview',
  templateUrl: './tracker-overview.component.html',
  styleUrls: ['./tracker-overview.component.css']
})
export class TrackerOverviewComponent implements OnInit {
  selection_item = SELECTION_ITEMS;
  public viewSelection: FormGroup;
  
  constructor(formBuilder: FormBuilder) {
    this.viewSelection = formBuilder.group({
      sizeControl: ["1", Validators.required]
     });
  }
  ngOnInit() {
  }

}
class SelectionItem {
  constructor(public name: string, public id: number){}
}

const SELECTION_ITEMS = [
  new SelectionItem("Daily", 1),
  new SelectionItem("3 Days", 2),
  new SelectionItem("Week", 3)
]

