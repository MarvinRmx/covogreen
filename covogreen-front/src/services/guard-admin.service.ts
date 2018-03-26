import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthentificationService} from "./authentification.service";

/**
 * @author Romain Lembo
 */
@Injectable()
export class GuardAdminService implements CanActivate {

    public isAdmin: boolean;

    constructor(
        private router: Router,
        private authenticationService: AuthentificationService
    ) {
        this.isAdmin = false;
        this.setIsAdministrator();
    }

    setIsAdministrator(): void {
        this.authenticationService.setIsAdministrator()
            .subscribe(result => {
                this.isAdmin = result;
            });
    }

    canActivate() {
        return this.isAdmin;
    }
}
