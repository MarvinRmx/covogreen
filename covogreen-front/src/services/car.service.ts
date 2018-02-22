import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Car } from '../class/car';
import {User} from "../class/user";

@Injectable()
export class CarService {

    private uri: string;

    constructor(
        private http: Http,
    )
    {
        this.uri = "http://localhost:1313/car";
    }

    createCar(car: Car): Observable<string> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.uri, JSON.stringify(car), options)
            .map((response: Response) => {
                console.log(response.text());
                return response.text();
            });
    }

    updateCar(car: Car): Observable<string> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.uri, JSON.stringify(car), options)
            .map((response: Response) => {
                console.log(response.text());
                return response.text();
            });
    }

    /**
     * Method for getting car data.
     * @returns {Observable<User>}
     */
    getCar(car: Car): Observable<Car> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.uri +"/"+ car.id_car, options)
            .map((response: Response) => {
                var result = response.text();
                return JSON.parse(result);
            });
    }

}
