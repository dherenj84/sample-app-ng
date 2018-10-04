import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../core/base.component';
import { LoginService } from '../login/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-somepage',
  templateUrl: './somepage.component.html',
  styleUrls: ['./somepage.component.css']
})
export class SomepageComponent extends BaseComponent implements OnInit {
  routeId: string = '';

  constructor(loginService: LoginService, private route: ActivatedRoute) {
    super(loginService);
    this.routeId = route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    console.log(this.routeId);
  }

}
