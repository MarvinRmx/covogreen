import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../class/user';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import * as jwt from 'angular2-jwt-simple';

@Injectable()
export class AuthentificationService {

    public user: User;
	public token: any;
    private uri: string;
    private skey: string;


	constructor(
        private http: Http,
        private router: Router,
    )
    {
		this.uri = "http://localhost:1313/";

        this.http.get('../assets/skey.txt').subscribe(data => {
            this.skey = data.text();
        });
	}

    /**
     * Method for accept or refuse connexion for users.
     * @param {User} user
     * @returns {Observable<boolean>}
     */
    login(user: User): Observable<boolean> {

        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.uri + "user/login", JSON.stringify(user), options)
            .map((response: Response) => {

                if (response.status === 200) {
                    this.token = jwt.decode(response.text(), this.skey);
                    if(this.token.revoked === true) {
                        alert('Compte bloqué');
                        return false;
                    }
                    localStorage.setItem('currentUser', JSON.stringify(this.token));

                    return true;
                }
                else return false;
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

}
