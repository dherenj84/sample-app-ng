import { Component, OnInit, Input } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  showNav: boolean = false;
  username: string;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.loggedIn$.subscribe(response => {
      if (response['loggedIn']) {
        this.showNav = true;
        this.username = response['username'];
      }
      else
        this.showNav = false;
    })
  }

  logout() {
    event.preventDefault();
    this.loginService.logout('success');
  }

}
