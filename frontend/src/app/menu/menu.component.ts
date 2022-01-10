import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { EDIT_TOPIC_URL, LOGIN_URL, OVERVIEW_URL } from '../routes';
import { User, UserService, UserStatusChanged } from '../user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  largeOpened = true;
  user: User = new User("");
  userStatus$: Subscription;
  menuEnabled: boolean = false;


  constructor(private userService: UserService, private router: Router) {
    this.userStatus$ = userService.user$.subscribe(this.updateOnUserChange);
    this.menuEnabled = userService.isLoggedIn();
    userService.checkLoginState();
   }

  ngOnInit() {
  }

  updateOnUserChange = (status: UserStatusChanged) => {
    this.menuEnabled = status.loggedIn;
    this.user = status.user;
  }

  logout = () => {
    this.userService.logout();
    this.router.navigate([LOGIN_URL]);
  }

  toOverview = () => {
    this.router.navigate([OVERVIEW_URL]);
  }

  toEditTopic = () => {
    this.router.navigate([EDIT_TOPIC_URL]);
  }

  ngOnDestroy(): void {
      this.userStatus$.unsubscribe();
  }

}
