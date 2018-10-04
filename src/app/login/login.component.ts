import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
import { isNullOrUndefined } from 'util';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginErrorText: string = '';
  loginProgress: boolean = false;
  loginError: boolean = false;
  user: any = {};
  public loggedInUserName: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private service: LoginService) { }

  ngOnInit() {
    if (!isNullOrUndefined(this.activatedRoute.snapshot.queryParams['logout'])) {
      this.loginError = true;
      if (this.activatedRoute.snapshot.queryParams['logout'] == 'error')
        this.loginErrorText = 'Your session has expired. Please login again to continue';
      else if (this.activatedRoute.snapshot.queryParams['logout'] == 'success')
        this.loginErrorText = 'Logout successful. Please login again to continue';
    }
    if (!isNullOrUndefined(sessionStorage.getItem('userSession'))) {
      this.router.navigate(['home']);
    }
  }

  login() {
    this.loginProgress = true;
    this.loginError = false;
    event.preventDefault();
    this.service.login(this.user).subscribe(response => {
      this.loginProgress = false;
      if (response['message'] === 'success') {
        this.router.navigate(['home']);
        sessionStorage.setItem('userSession', JSON.stringify(response));
        this.service.setLogin();
      }
      else {
        this.loginError = true;
        this.loginErrorText = 'Invalid Email or Password!';
        sessionStorage.removeItem('userSession');
      }
    }, (error) => {
      this.loginProgress = false;
      this.loginError = true;
      this.loginErrorText = error;
      sessionStorage.removeItem('userSession');
    })
  }
}
