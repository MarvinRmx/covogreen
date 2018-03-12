import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Journey} from '../class/journey';
import {Observable} from 'rxjs/Observable';
import {AuthRequest} from './authrequest.service';
import {User} from "../class/user";

@Injectable()
export class JourneyService {

    private uri: string;

    constructor(
        private http: Http,
        private authRequest: AuthRequest
    ) {
        this.uri = 'http://localhost:1313/journey';
    }

    getJourneysByUser(): Observable<Array<Journey>> {

        return this.http.get(this.uri  + '/byuser', this.authRequest.requestOptions)
            .map((response: Response) => {
                console.log('getJourneysByUser service : ', response.text());
                let result = response.text();
                return JSON.parse(result);
            });
    }

    createJourney(journey: Journey): Observable<string> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.uri, JSON.stringify(journey), options)
            .map((response: Response) => {
                console.log(response.text());
                return response.text();
            });
    }
}
