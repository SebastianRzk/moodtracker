import { Component, OnInit } from '@angular/core';
import { Topic, TopicsService, TopicType } from 'src/app/topics.service';

@Component({
  selector: 'app-add-active-topic',
  templateUrl: './add-active-topic.component.html',
  styleUrls: ['./add-active-topic.component.css']
})
export class AddActiveTopicComponent implements OnInit {

  public selectedType = '0';
  public name = '';
  public order = 0;

  constructor(private topicService: TopicsService) { }

  ngOnInit(): void {
  }

  createTopic = () => {
    this.topicService.createTopic({
      active: true,
      name: this.name,
      order: this.order,
      type: +this.selectedType,
      id: -1
    });

    this.selectedType = '0';
    this.order = 0;
    this.name = '';
  }

}
