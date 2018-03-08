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
    public isAdmin: boolean;

    constructor(
		private authenticationService: AuthentificationService
    ) {
        this.isAdmin = false;
        this.setIsAdministrator();
    }

    logout(): void {
        this.authenticationService.logout();
    }

    checkAuth(): boolean {
        let tokenUser = localStorage.getItem('currentUser');

        if (tokenUser !== null) return true;
        return false;
    }

    setIsAdministrator(): void {
        this.authenticationService.setIsAdministrator()
            .subscribe(result => {
                this.isAdmin = result;
            });
    }

}
