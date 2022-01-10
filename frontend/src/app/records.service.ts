import { Injectable } from '@angular/core';
import { debounce, map, Observable, Subject } from 'rxjs';
import { toISODate } from './converter';
import { DEBOUNCE_GENERATOR, SERVER_RECORDS_PATH, SERVER_TOPICS_PATH } from './general-configuration';
import { HttpWrapperService } from './http-wrapper.service';
import { Topic } from './topics.service';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  private topicSubjects = {};

  constructor(private httpWrapper: HttpWrapperService) { }

  public loadRecordFor = (topic: Topic, date: Date): Observable<Record> => {
    let o: Observable<RecordDto> = this.httpWrapper.get(this.computePath(topic, date))
    return o.pipe(map((source: RecordDto) => this.fromRecordDto(source, date)));
   } 


  emitChange = (topic: Topic, record: Record) => {
    if (!(topic.id in this.topicSubjects)) {
      this.topicSubjects[topic.id] = new Subject();
      this.topicSubjects[topic.id].pipe(debounce((i) => DEBOUNCE_GENERATOR())).subscribe(this.refreshData);
    }
    this.topicSubjects[topic.id].next(new RecordChange(topic, record));
  }

  private refreshData = (change: RecordChange) => {
    this.httpWrapper.put(this.computePath(change.topic, change.record.date), this.toRecordDto(change.record)).toPromise();
  }

  private computePath =  (topic: Topic, date: Date): string => {
    return SERVER_TOPICS_PATH + "/" + topic.id + "/" + SERVER_RECORDS_PATH + "/" + toISODate(date);
  }

  private fromRecordDto = (dto:RecordDto, date: Date):Record => {
    return new Record(
      date,
      this.toTimeObject(dto.from),
      this.toTimeObject(dto.to),
      dto.number,
      dto.text,
      dto.boolean
    );
  }

  private toRecordDto = (record: Record) => {
    return new RecordDto(
      this.toIsoTime(record.from),
      this.toIsoTime(record.to),
      record.number,
      record.text,
      record.boolean
    )
  }

  private toTimeObject = (time:string):Time  => {
    let timeSplit = time.split(':');
    let minutes = +timeSplit[1];
    let hours = +timeSplit[0];
    return new Time(hours, minutes)
  }

  private toIsoTime = (time:Time):string => {
    return this.padZero(time.hours) + ":" + this.padZero(time.minutes);
  }

  private padZero = (n: number) => {
    let text = n + "";
    if(text.length == 1) {
      return "0" + text;
    }
    return text;
  }

}

class RecordChange {
  constructor(
    public topic: Topic,
    public record: Record
  ){}
}

export class RecordDto {
  constructor(
    public from?: string,
    public to?: string,
    public number?: number,
    public text?: string,
    public boolean?: boolean){}
}

export class Record {
  constructor(
    public date: Date,
    public from: Time=EMPTY_TIME,
    public to: Time=EMPTY_TIME,
    public number?: number,
    public text?: string,
    public boolean?: boolean){}
}



export class Time {
  constructor(public hours: number, public minutes: number){}
}

const EMPTY_TIME: Time = {
  hours: 0,
  minutes: 0
}
