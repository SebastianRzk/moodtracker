import { Component, OnInit } from '@angular/core';
import { DateService } from 'src/app/date.service';

@Component({
  selector: 'app-date-changer',
  templateUrl: './date-changer.component.html',
  styleUrls: ['./date-changer.component.css']
})
export class DateChangerComponent implements OnInit {

  constructor(private dateService: DateService) { }

  ngOnInit() {
  }

  oneDayForward = () => {
    this.dateService.oneDayIntoFuture();
  }

  oneWeekForward = () => {
    this.dateService.oneWeekIntoFuture();
  }

  oneDayBackward = () => {
    this.dateService.oneDayIntoPast();
  }

  oneWeekBackward = () => {
    this.dateService.oneWeekIntoPast();
  }

  today = () => {
    this.dateService.today();
  }

}
