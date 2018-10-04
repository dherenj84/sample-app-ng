import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedIn = new Subject<Object>();
  loggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  login(user: any) {
    // return this.http.post(environment.serviceUrl + 'public/api/login', user).pipe(catchError(err => this.handleError(err)));
    return this.http.get('assets/login_stub.json').pipe(catchError(err => this.handleError(err)));
  }

  getUserSession() {
    return JSON.parse(sessionStorage.getItem('userSession'));
  }

  logout(condition: string) {
    sessionStorage.clear();
    this.router.navigate(['/login'], {
      queryParams: { 'logout': condition }
    });
    this.loggedIn.next({
      loggedIn: false,
      username: ''
    });
  }

  setLogin() {
    var username = this.getUserSession()['data']['name'];
    this.loggedIn.next({
      loggedIn: true,
      username: username
    });
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.message}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };
}
