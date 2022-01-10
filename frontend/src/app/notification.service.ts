import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  notify = (notification: string) => {
    console.log("notification got:");
    console.log(notification);
  }
}
