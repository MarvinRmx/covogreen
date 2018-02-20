import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Journey} from '../class/journey';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class JourneyService {

    private uri: string;

    constructor(private http: Http) {
        this.uri = "http://localhost:1313/";
    }

    createJourney(journey: Journey): Observable<string> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.uri + "journey", JSON.stringify(journey), options)
            .map((response: Response) => {
                console.log(response.text());
                return response.text();
            });
    }
}
