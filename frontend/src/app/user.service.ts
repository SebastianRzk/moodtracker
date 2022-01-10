import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { SERVER_LOGOUT_PATH, SERVER_USER_PATH } from './general-configuration';
import { HttpWrapperService } from './http-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedIn = true;
  user$ = new Subject<UserStatusChanged>();
  loginUrl = "";

  constructor(private httpWrapper: HttpWrapperService) { }

  userStatus = () => {
    return this.user$;
  }

  checkLoginState = () => {
    this.httpWrapper.get(SERVER_USER_PATH).toPromise().then(
      (data: UserDto) => {
        this.loggedIn = data.loggedin;
        this.user$.next(new UserStatusChanged(data.loggedin, new User(data.username), data.loginroute))
      },
      error => {
        this.loggedIn = false;
        this.user$.next(STATUS_LOGGED_OUT)
      }     
    );
  }

  isLoggedIn = ():boolean => {
    return this.loggedIn;
  }

  logout = () => {
    this.httpWrapper.get(SERVER_LOGOUT_PATH).toPromise().then(
      (data: any) => {
        this.checkLoginState();
      },
      error => {
        this.checkLoginState();
            }     
    );
  }

}


export class User {
  constructor(public name: string){}
}

class UserDto {
  username: string;
  loggedin: boolean;
  loginroute: string;
}

export class UserStatusChanged {
  constructor(public loggedIn: boolean, public user?: User, public loginRoute?:string) {}
}

const STATUS_LOGGED_OUT = new UserStatusChanged(false);