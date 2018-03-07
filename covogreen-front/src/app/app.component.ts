import { Component } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { User } from '../class/user';

import 'hammerjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [AuthentificationService]
})

export class AppComponent {
    public user: User;

    constructor(
		private authenticationService: AuthentificationService
    ) {}

    logout(): void {
        this.authenticationService.logout();
    }

    checkAuth(): boolean {
        let tokenUser = localStorage.getItem('currentUser');

        if (tokenUser !== null) return true;
        return false;
    }

    /*checkAuthAdmin(): boolean {
        let tokenUser = localStorage.getItem('currentUser');
        this.user = JSON.parse(tokenUser) !== null ? JSON.parse(tokenUser) : {username: null, privilege: 0};

        if (this.user.privilege === 2) return true;
        return false;
    }*/
}
