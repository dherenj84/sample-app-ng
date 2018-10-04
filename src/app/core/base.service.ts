import { HttpErrorResponse, HttpHeaders, HttpClient } from "@angular/common/http";
import { throwError } from 'rxjs';
import { LoginService } from "../login/login.service";
import { environment } from "../../environments/environment";
import { catchError, map } from "rxjs/operators";

export class BaseService {
    protected baseUrl = environment.serviceUrl + 'secure/api/';

    constructor(protected http: HttpClient, protected loginService: LoginService) { }

    handleError(error: HttpErrorResponse) {
        if (error.status == 401 || error.status == 403)
            this.loginService.logout('error');
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

    getLookUpData(lookUpType: string) {
        if (lookUpType == 'state')
            return this.http.get<any[]>('assets/lookup_state.json').pipe(map((states => {
                states.forEach(state => {
                    state['label'] = state['value'];
                });
                return states;
            })));
        else
            return this.http.get<any[]>(this.baseUrl + 'getLookUpData' + '/' + lookUpType, {
                headers: this.customHeaders()
            }).pipe(catchError(err => this.handleError(err)));
    }

    customHeaders() {
        return new HttpHeaders({
            'Authorization': 'Bearer ' + this.loginService.getUserSession()['data']['token']
        })
    }
}