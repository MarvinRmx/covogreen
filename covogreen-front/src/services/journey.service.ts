import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Journey} from '../class/journey';
import {Observable} from 'rxjs/Observable';
import {AuthRequest} from './authrequest.service';

@Injectable()
export class JourneyService {

    private uri: string;

    constructor(private http: Http,
                private authRequest: AuthRequest) {
        this.uri = 'http://localhost:1313/journey';
    }

    getUri(): string {
        return this.uri;
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

    /**
     * @author Romain LEMBO & Marvin RAMEIX
     *  Get Journeys from an user which are already done
     * @returns {Observable<Array<Journey>>}
     */
    getJourneysByUserDone(): Observable<Array<Journey>> {

        return this.http.get(this.uri + '/byuser/inf', this.authRequest.requestOptions)
            .map((response: Response) => {
                let result = response.text();
                return JSON.parse(result);
            });
    }
    /**
     * @author Romain LEMBO & Marvin RAMEIX
     *  Get next Journeys from an user
     * @returns {Observable<Array<Journey>>}
     */
    getJourneysByUserToDo(): Observable<Array<Journey>> {

        return this.http.get(this.uri + '/byuser/sup', this.authRequest.requestOptions)
            .map((response: Response) => {
                let result = response.text();
                return JSON.parse(result);
            });
    }

    isDriverThisJourney(journey: Journey): Observable<boolean> {

        return this.http.post(this.uri + '/isdriver', JSON.stringify(journey), this.authRequest.requestOptions)
            .map((response: Response) => {
                let result = response.text();
                return JSON.parse(result);
            });
    }

    /**
     * @author Marvin RAMEIX
     * @param {Journey} journey
     * @returns {Observable<string>}
     */
    createJourney(journey: Journey): Observable<string> {

        return this.http.post(this.uri, JSON.stringify(journey), this.authRequest.requestOptions)
            .map((response: Response) => {
                return response.text();
            });
    }

    /**
     * @author Marvin RAMEIX
     * Getting a journey from id
     * @returns {Observable<string>}
     */
    getJourney(id_journey): Observable<Journey> {
        return this.http.get(this.uri + '/' + id_journey, this.authRequest.requestOptions)
            .map((response: Response) => {
                let result = response.text();
                return JSON.parse(result);
            });
    }

    /**
     * @author Marvin RAMEIX
     * Deleting a journey
     * @returns {Observable<string>}
     */
    deleteJourney(id_journey): Observable<string> {
        return this.http.delete(this.uri + '/del/' + id_journey, this.authRequest.requestOptions)
            .map((response: Response) => {
                console.log(response);
                return response.text();
            });
    }
}
