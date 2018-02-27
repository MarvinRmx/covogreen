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
    )
    {
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

        return this.http.put(this.uri, JSON.stringify(user), options)
            .map((response: Response) => {
                console.log(response.text());
                return response.text();
            });
    }
    // 27-02-18
    // Ajout DELETE USER

    deleteUser(user: User): Observable<string> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.uri, JSON.stringify(user), options)
            .map((response: Response) => {
                console.log(response.text());
                return response.text();
            });
    }

    /**
     * Method for getting user data.
     * @returns {Obsrevable<User>}
     */
    getUser(): Observable<User> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        let token = localStorage.getItem('currentUser');
        this.user = JSON.parse(token);

        return this.http.get(this.uri +"/"+ this.user.id_user, options)
            .map((response: Response) => {
                var result = response.text();
                return JSON.parse(result);
            });
    }

}
