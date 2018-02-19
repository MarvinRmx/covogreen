import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import { User } from '../class/user';

@Injectable()
export class GuardAdminService implements CanActivate {
    private user:User;

    constructor(private router: Router) { }

    checkAuthAdmin(): boolean {
        let tokenUser = localStorage.getItem('currentUser');
        this.user = JSON.parse(tokenUser) !== null ? JSON.parse(tokenUser) : {username: null, privilege: 0};

        if (this.user.privilege === 2) return true;
        return false;
    }

    canActivate() {
        if (this.checkAuthAdmin())  return true;
        // not logged in so redirect to login page
        this.router.navigate(['/']);
        return false;
    }
}
