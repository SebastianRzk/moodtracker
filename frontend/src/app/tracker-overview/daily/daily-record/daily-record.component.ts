import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DateService } from 'src/app/date.service';
import { Record, RecordsService } from 'src/app/records.service';
import { Topic, TopicType } from 'src/app/topics.service';

@Component({
  selector: 'app-daily-record',
  templateUrl: './daily-record.component.html',
  styleUrls: ['./daily-record.component.css']
})
export class DailyRecordComponent implements OnInit, OnDestroy {

  @Input()
  topic: Topic;

  types = TopicType

  data: Record = new Record(null);

  date$: Subscription;

  data$: Subscription;

  constructor(private recordsService: RecordsService, private dateService: DateService) { }

  ngOnInit() {
    this.date$ = this.dateService.date$.subscribe(
      date => {
        this.data$?.unsubscribe();    
        this.data$ = this.recordsService.loadRecordFor(this.topic, date).subscribe(d => this.data = d); 
      }
      
    );
  }

  ngOnDestroy(): void {
    this.date$?.unsubscribe();
    this.data$?.unsubscribe();
  }

}
