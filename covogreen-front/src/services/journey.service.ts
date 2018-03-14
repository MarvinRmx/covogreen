import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Journey} from '../class/journey';
import {Observable} from 'rxjs/Observable';
import {AuthRequest} from './authrequest.service';

@Injectable()
export class JourneyService {

    private uri: string;

    constructor(
        private http: Http,
        private authRequest: AuthRequest
    ) {
        this.uri = 'http://localhost:1313/journey';
    }

    getDay(value): string {

        let weekday = new Array(7);

        weekday[0] = 'Dimanche';
        weekday[1] = 'Lundi';
        weekday[2] = 'Mardi';
        weekday[3] = 'Mercredi';
        weekday[4] = 'Jeudi';
        weekday[5] = 'Vendredi';
        weekday[6] = 'Samedi';

        return weekday[value.getDay()];

    }

    getMonth(value): string {

        let month = new Array(12);

        month[0] = 'Janvier';
        month[1] = 'Février';
        month[2] = 'Mars';
        month[3] = 'Avril';
        month[4] = 'Mai';
        month[5] = 'Juin';
        month[6] = 'Juillet';
        month[7] = 'Août';
        month[8] = 'Septembre';
        month[9] = 'Octobre';
        month[10] = 'Novembre';
        month[11] = 'Décembre';

        return month[value.getMonth()];
    }

    getJourneysByUser(): Observable<Array<Journey>> {

        return this.http.get(this.uri  + '/byuser', this.authRequest.requestOptions)
            .map((response: Response) => {
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
