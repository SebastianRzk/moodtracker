import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  date$: ReplaySubject<Date>;
  selectedDate: Date;

  constructor() { 
    this.date$ = new ReplaySubject();
    this.selectedDate = new Date();
    this.date$.next(this.selectedDate); 
  }

  getDate = () : Subject<Date>   => {
    return this.date$;
  }

  oneDayIntoFuture = () => {
    this.updateDays(1)
  }

  oneWeekIntoFuture = () => {
    this.updateDays(7)
  }

  oneDayIntoPast = () => {
    this.updateDays(-1)
  }

  oneWeekIntoPast = () => {
    this.updateDays(-7)
  }

  today = () => {
    this.selectedDate = new Date();
    this.date$.next(new Date());
  }


  updateDays = (days: number) => {
    this.selectedDate = new Date(this.selectedDate.getTime() + (1000 * 60 * 60 * 24 * days));
    this.date$.next(this.selectedDate);
  }


}
