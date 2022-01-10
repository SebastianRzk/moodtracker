import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounce, interval, map, Observable, Subject, Subscription } from 'rxjs';
import { DEBOUNCE_GENERATOR } from '../general-configuration';
import { Topic, TopicsService, TopicType } from '../topics.service';

@Component({
  selector: 'app-edit-topics',
  templateUrl: './edit-topics.component.html',
  styleUrls: ['./edit-topics.component.css']
})
export class EditTopicsComponent implements OnInit, OnDestroy {

  activeTopics: Observable<Topic[]>;
  archivedTopics: Observable<Topic[]>;
  TopicType = TopicType;

  nameChangeSubject = new Subject<Topic>();
  nameChangeSubject$: Subscription;

  constructor(private topicService: TopicsService) {
    this.archivedTopics = topicService.getAllTopics().pipe(map(this.onlyArchived));
    this.activeTopics = topicService.getAllTopics().pipe(map(this.onlyActive));
    topicService.loadAllTopics();

    this.nameChangeSubject$ = this.nameChangeSubject.pipe(debounce((i) => DEBOUNCE_GENERATOR())).subscribe(this.updateName);
   }

  onlyArchived = (source: Topic[]) => {
    return source.filter(t => !t.active)
  }

  onlyActive = (source: Topic[]) => {
    return source.filter(t => t.active)
  }

  deleteTopic = (topic:Topic) => {
    this.topicService.deleteTopic(topic);
  }

  archiveTopic = (topic: Topic) => {
    this.topicService.updateTopic({
      id: topic.id,
      name: topic.name,
      type: topic.type,
      order: topic.order,
      active: false
    });
  }

  unArchiveTopic = (topic: Topic) => {
    this.topicService.updateTopic({
      id: topic.id,
      name: topic.name,
      type: topic.type,
      order: topic.order,
      active: true
    })
  }

  onNameChange = (topic: Topic, new_name: string) => {
    this.nameChangeSubject.next({
      id: topic.id,
      name: new_name,
      type: topic.type,
      order: topic.order,
      active: topic.active
    })
  }

  updateName = (topic: Topic) => {
    this.topicService.updateTopic(topic);
  }

  onOrderChange = (topic: Topic, new_order: number) => {
    this.topicService.updateTopic({
      id: topic.id,
      name: topic.name,
      type: topic.type,
      order: new_order,
      active: topic.active
    })
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
      this.nameChangeSubject$.unsubscribe();
  }


}
