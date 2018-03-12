import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../class/user';
import { Car } from '../class/car';

@Injectable()
export class UserService {

    private uri: string;
    public user: User;

    constructor(
        private http: Http,
    ) {
		this.uri = "http://localhost:1313/user";
	}

    /**
     * Method for creating an user with or without his car.
     * @param {User} user
     * @param {Car} car
     * @returns {Observable<string>}
     */
    createUser(user: User, car: Car): Observable<string> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.uri, JSON.stringify({user, car}), options)
            .map((response: Response) => {
                console.log(response.text());
                return response.text();
            });
    }

    updateUser(user: User): Observable<string> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        user.id_user = this.user.id_user;

        return this.http.put(this.uri, JSON.stringify(user), options)
            .map((response: Response) => {
                console.log(response.text());
                return response.text();
            });
    }

    deleteUser(user: User): Observable<string> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(this.uri +"/"+ user.id_user, options)
            .map((response: Response) => {
                return response.text();
            });
    }

    /**
     * Method for getting user data.
     * @returns {Observable<User>}
     */
    getUser(): Observable<User> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        let token = localStorage.getItem('currentUser');
        this.user = JSON.parse(token);

        return this.http.get(this.uri +"/"+ this.user.id_user, options)
            .map((response: Response) => {
                let result = response.text();
                return JSON.parse(result);
            });
    }

    /**
     * Method for getting all users data.
     * @returns {Observable<User>}
     */
    getUsers(): Observable<Array<User>> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.uri, options)
            .map((response: Response) => {
                let result = response.text();
                return JSON.parse(result);
            });
    }

}
