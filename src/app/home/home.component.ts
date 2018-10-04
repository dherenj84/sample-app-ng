import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { BaseComponent } from '../core/base.component';

export interface Widget {
  id: string,
  header: string,
  description: string,
  href: string,
  disabled?: boolean
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent implements OnInit {
  apps: Widget[] = [];
  constructor(private router: Router, loginService: LoginService) {
    super(loginService);
  }

  ngOnInit() {
    if (!isNullOrUndefined(sessionStorage.getItem('userSession'))) {
      this.apps.push({
        id: '1',
        header: 'Some Page',
        description: 'Some page in your app where you want to navigate',
        href: '/somepage/1'
      });
      this.apps.push({
        id: '2',
        header: 'Report Center',
        description: 'Click below to see the list of available reports to download',
        href: '/reportcenter'
      });
    }
    else {
      this.router.navigate(['/login']);
    }
  }
}
