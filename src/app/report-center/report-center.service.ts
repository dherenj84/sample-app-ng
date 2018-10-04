import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../core/base.service';
import { LoginService } from '../login/login.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportCenterService extends BaseService {

  constructor(http: HttpClient, loginService: LoginService) {
    super(http, loginService);
  }

  download(reportUrl: string) {
    //uncomment this when using an actual backend service

    // return this.http.get(this.baseUrl + reportUrl, {
    //   headers: this.customHeaders(),
    //   responseType: 'blob'
    // }).pipe(catchError(err => this.handleError(err)));

    return this.http.get('assets/' + reportUrl, {
      headers: this.customHeaders(),
      responseType: 'blob'
    }).pipe(catchError(err => this.handleError(err)));
  }
}
