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

    public isAdmin: boolean;
    public user: User;
	public token: any;
    private uri: string;
    private skey: string;

	constructor(
        private http: Http,
        private router: Router,
        private authRequest: AuthRequest
    )
    {
		this.uri = 'http://localhost:1313/';

		this.isAdmin = false;
		this.setIsAdministrator();
	}

    /**
     * Method for accept or refuse connexion for users.
     * @param {User} user
     * @returns {Observable<boolean>}
     */
    login(user: User): Observable<number> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.uri + 'user/login', JSON.stringify(user), options)
            .map((response: Response) => {

                if (response.status === 200) {
                    this.token = response.text();
                    localStorage.setItem('currentUser', this.token);
                }
                return response.status;
            });
    }

    /**
     * Method disconnect user session.
     */
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }

    /**
     * Method for checking if user is administrator
     * @returns {Observable<boolean>}
     */
    setIsAdministrator(): Observable<boolean> {

        return this.http.get(this.uri + 'user/admin',  this.authRequest.requestOptions)
            .map((response: Response) => {
                this.isAdmin = Boolean( response.text() );
                return Boolean(response.text());
            });

    }

}
