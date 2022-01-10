import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { SERVER_PATH } from './general-configuration';
import { NotificationService } from './notification.service';
import { LOGIN_URL } from './routes';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class HttpWrapperService {

  constructor(
    private http: HttpClient,
     private router: Router, private notificationService: NotificationService) { }


  get = <T> (url: string): Observable<T> => {
    return this.http.get(
      SERVER_PATH + url
    )
    .pipe(catchError(this.onError));
  }

  put = ( url: string, data:any): Observable<any>=> {
    return this.http.put(
      SERVER_PATH + url,
      data
    )
    .pipe(catchError(this.onError));
  }

  delete = ( url: string): Observable<any> => {
    return this.http.delete(
      SERVER_PATH + url
    )
    .pipe(catchError(this.onError));
  }

  onError = (err:any, caught:Observable<any>) => {
    console.log(err);
    this.notificationService.notify("Error on request occurred. Please re-login");
    this.router.navigate([LOGIN_URL]);
    return err;
  }
}


