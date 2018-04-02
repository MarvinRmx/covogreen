import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../class/user';
import {Car} from '../class/car';
import {AuthRequest} from './authrequest.service';

@Injectable()
export class UserService {

    private uri: string;
    public user: User;

    constructor(private http: Http,
                private authRequest: AuthRequest) {
        this.uri = 'http://localhost:1313/user';
    }

    getUri(): string {
        return this.uri;
    }

    /**
     * Method for creating an user with or without his car.
     * @param {User} user
     * @param {Car} car
     * @returns {Observable<string>}
     */
    createUser(user: User, car: Car): Observable<string> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

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

        return this.http.get(this.uri + '/get', this.authRequest.requestOptions)
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

    /**
     * @author Marvin RAMEIX
     * @param {number} id_user
     * Get a selected user from his id
     * @returns {Observable<User>}
     */
    getUserFromId(id_user): Observable<User> {
        return this.http.get(this.uri + '/get/' + id_user, this.authRequest.requestOptions)
            .map((response: Response) => {
                let result = response.text();
                return JSON.parse(result);
            });
    }

    /**
     * @author Marvin RAMEIX
     * @param {number} id_user
     * Get all rates and comments of an user from his id
     * @returns {Observable<Object>}
     */
    getRateAndCommentFromUserId(id_user): Observable<Object> {
        return this.http.get(this.uri + '/rateComment/' + id_user, this.authRequest.requestOptions)
            .map((response: Response) => {
                return JSON.parse(response.text());
            });
    }

    /**
     * @author Marvin RAMEIX
     * @param {number} id_user
     * Get the number of journeys done by an user from his id
     * @returns {Observable<Object>}
     */
    countDoneJourneys(id_user): Observable<Object> {
        return this.http.get(this.uri + '/countDoneJourneys/' + id_user, this.authRequest.requestOptions)
            .map((response: Response) => {
                return JSON.parse(response.text());
            });
    }

    /**
     * @author Marvin RAMEIX
     * @param {number} id_user
     * Get a the average rating attributed to an user from his id
     * @returns {Observable<Object>}
     */
    getAverageRating(id_user): Observable<Object> {
        return this.http.get(this.uri + '/getaveragerating/' + id_user, this.authRequest.requestOptions)
            .map((response: Response) => {
                return JSON.parse(response.text());
            });
    }

    /**
     * @author Marvin RAMEIX
     * Format the sql date from user creation date to be displayed
     * @returns String
     */
    getDate(date) {
        return new Date(date).toLocaleDateString();
    }
}
