import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../class/user';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {AuthRequest} from './authrequest.service';

@Injectable()
export class AuthentificationService {

    public user: User;
    private uri: string;

	constructor(
        private http: Http,
        private router: Router,
        private authRequest: AuthRequest
    )
    {
		this.uri = 'http://localhost:1313/';
	}

    /**
     * Method for accept or refuse connexion for users.
     * @param {User} user
     * @returns {Observable<boolean>}
     */
    login(user: User): Observable<number> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        localStorage.removeItem('currentUser');

        return this.http.post(this.uri + 'user/login', JSON.stringify(user), options)
            .map((response: Response) => {

                if (response.status === 200) {
                    localStorage.setItem('currentUser', response.text());
                }
                return response.status;
            });
    }

    /**
     * Method disconnect user session.
     */
    logout(): void {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/']);
        window.location.reload(true);
    }

    /**
     * Method for checking if user is administrator
     * @returns {Observable<boolean>}
     */
    setIsAdministrator(): Observable<boolean> {

        return this.http.get(this.uri + 'user/admin',  this.authRequest.requestOptions)
            .map((response: Response) => {
                return JSON.parse(response.text());
            });

    }

}
