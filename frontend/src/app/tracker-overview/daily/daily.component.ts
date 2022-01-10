import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { DateService } from 'src/app/date.service';
import { Topic, TopicsService } from 'src/app/topics.service';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.css']
})
export class DailyComponent implements OnInit, OnDestroy {

  topics$: Observable<Topic[]>;
  date$: Subscription;
  greeter = "Loading..."; 

  constructor(private topicService: TopicsService, private dateService: DateService) { }

  ngOnInit() {
    this.topics$ = this.topicService.getActiveTopics();
    this.topicService.loadAllTopics();
    this.date$ = this.dateService.date$.subscribe(
      newDate => this.updateDay(newDate)
    );
  }

  ngOnDestroy(): void {
      this.date$.unsubscribe();
  }

  updateDay = (date:Date) => {
    this.computeGreeter(date);
  }


  computeGreeter = (date:Date) => {
    if (this.isToday(date)) {
      this.greeter = "Welcome to your day today!"
      return;
    }
    this.greeter = "Welcome to your day on " + date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
  }

  isToday = (someDate) => {
    const today = new Date()
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
  }

}
