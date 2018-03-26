import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {AuthRequest} from './authrequest.service';

/**
 * @author Romain Lembo
 */
@Injectable()
export class RateService {

    private uri: string;

    constructor(
        private http: Http,
        private authRequest: AuthRequest
    ) {
        this.uri = 'http://localhost:1313/rate';
    }

    /**
     * Method for getting rate to driver.
     * @returns {Observable<User>}
     */
    getRateByDriver(id_user: number): Observable<number> {

        return this.http.get(this.uri + '/' + id_user, this.authRequest.requestOptions)
            .map((response: Response) => {
                let result = response.text();
                return JSON.parse(result);
            });
    }
}
