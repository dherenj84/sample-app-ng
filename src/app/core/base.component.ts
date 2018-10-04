import { LoginService } from '../login/login.service';
import { Component } from '@angular/core';
import { isNullOrUndefined } from 'util';

declare var $: any;
@Component({
    selector: 'app-base',
    template: ''
})
export class BaseComponent {
    protected _$ = $;
    protected digitsRegex = new RegExp('^[0-9]+$');
    protected alphaNumRegex = new RegExp('^[a-zA-Z0-9 _,()-]+$');
    constructor(protected loginService: LoginService) {
        if (isNullOrUndefined(loginService.getUserSession()))
            loginService.logout('error');
        else
            loginService.setLogin();
    }

    getLoggedInUser() {
        return this.loginService.getUserSession();
    }
}
