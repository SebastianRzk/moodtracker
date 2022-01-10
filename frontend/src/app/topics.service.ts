import { Injectable } from '@angular/core';
import { Subject, ReplaySubject, map } from 'rxjs'
import { SERVER_TOPICS_PATH } from './general-configuration';
import { HttpWrapperService } from './http-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  allTopics: Subject<Topic[]> = new ReplaySubject();

  constructor(private http: HttpWrapperService) { }

  public getActiveTopics =  () => {
    return this.getAllTopics().pipe(map(e => e.filter(t => t.active)));
  }

  public getAllTopics = () => {
    return this.allTopics.asObservable();
  }

  public loadAllTopics = () => {
    this.http.get(SERVER_TOPICS_PATH).toPromise().then((dto: GetTopicsDto) => 
    { 
      let topics = dto.topics.map(x => this.createTopicEntity(x));
      this.allTopics.next(topics);
    });
  }

  public deleteTopic = (topic: Topic) => {
    this.http.delete(SERVER_TOPICS_PATH + '/' + topic.id)
      .toPromise()
      .then(x => this.loadAllTopics()
    );
  }

  public createTopic = (topic: Topic) => {
    this.http.put(SERVER_TOPICS_PATH, this.createTopicDto(topic))
    .toPromise()
    .then(x => this.loadAllTopics()
  );
  }

  public updateTopic = (topic: Topic) => {
    this.http.put(SERVER_TOPICS_PATH + '/' + topic.id, this.createTopicDto(topic))
    .toPromise()
    .then(x => this.loadAllTopics()
  );
  }

  private createTopicDto = (topic: Topic): TopicDto => {
    return {
      topictype: topic.type,
      topicname: topic.name,
      active: topic.active,
      order: topic.order
    }
  }

  private createTopicEntity = (dto: TopicDto): Topic => {
    return {
      id: dto.id,
      name: dto.topicname,
      order: dto.order,
      active: dto.active,
      type: dto.topictype
    }
  }
}

export class GetTopicsDto {
  topics: TopicDto[];
}

export class TopicDto {
  id?: number;
  topictype: number;
  topicname: string;
  active: boolean;
  order: number;
}

export class Topic {
  id: number;
  type: TopicType;
  name: string;
  active: boolean;
  order: number;
}

export enum TopicType {
  boolean = 0,
  integer_number = 1,
  short_text = 2,
  long_text = 3,
  dynamic_checklist = 4, 
  time_delta = 5,
  mood = 6
}

