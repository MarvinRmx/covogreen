import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../class/user';
import { Car } from '../class/car';
import {AuthRequest} from "./authrequest.service";

/**
 * @author Romain Lembo
 */
@Injectable()
export class UserService {

    private uri: string;
    public user: User;

    constructor(
        private http: Http,
        private authRequest: AuthRequest
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

    /**
     * Method for updating an user.
     * @param {User} user
     * @returns {Observable<string>}
     */
    updateUser(user: User): Observable<string> {

        return this.http.put(this.uri, JSON.stringify(user), this.authRequest.requestOptions)
            .map((response: Response) => {
                console.log(response.text());
                return response.text();
            });
    }

    /**
     * Methor for deleting an user.
     * @returns {Observable<string>}
     */
    deleteUser(): Observable<string> {

        return this.http.delete(this.uri, this.authRequest.requestOptions)
            .map((response: Response) => {
                return response.text();
            });
    }

    /**
     * Method for getting user data.
     * @returns {Observable<User>}
     */
    getUser(): Observable<User> {

        return this.http.get(this.uri + "/get", this.authRequest.requestOptions)
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

        return this.http.get(this.uri, this.authRequest.requestOptions)
            .map((response: Response) => {
                let result = response.text();
                return JSON.parse(result);
            });
    }

}
