import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OVERVIEW_URL } from '../routes';
import { UserService, UserStatusChanged } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private user$: Subscription;
  public loginRoute = "";

  constructor(private userService: UserService, private router: Router, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.user$ = this.userService.userStatus().subscribe(data => this.handleUserState(data));
    this.userService.checkLoginState();
  }

  ngOnDestroy(): void {
    this.user$.unsubscribe();
  }

  handleUserState = (userStatusChange: UserStatusChanged) => {
    if(userStatusChange.loggedIn) {
      this.router.navigate([OVERVIEW_URL]);
      return;
    }
    this.loginRoute = userStatusChange.loginRoute;
    this.changeDetectorRef.detectChanges();
  }
}
