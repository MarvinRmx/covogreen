import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Car } from '../class/car';
import {User} from "../class/user";
import {AuthRequest} from "./authrequest.service";

/**
 * @author Romain Lembo
 */
@Injectable()
export class CarService {

    private uri: string;

    constructor(
        private http: Http,
        private authRequest: AuthRequest
    )
    {
        this.uri = "http://localhost:1313/car";
    }

    /**
     * Method for creating a car.
     * @param {Car} car
     * @param {User} user
     * @returns {Observable<string>}
     */
    createCar(car: Car, user: User): Observable<string> {

        return this.http.post(this.uri, JSON.stringify({car, user}), this.authRequest.requestOptions)
            .map((response: Response) => {
                console.log(response.text());
                return response.text();
            });
    }

    /**
     * Method for updating a car.
     * @param {Car} car
     * @returns {Observable<string>}
     */
    updateCar(car: Car): Observable<string> {

        return this.http.put(this.uri, JSON.stringify(car), this.authRequest.requestOptions)
            .map((response: Response) => {
                console.log(response.text());
                return response.text();
            });
    }

    /**
     * Method for deleting a car.
     * @param {Car} car
     * @returns {Observable<string>}
     */
    deleteCar(car: Car): Observable<string> {

        return this.http.delete(this.uri +"/"+ car.id_car, this.authRequest.requestOptions)
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

        return this.http.get(this.uri +"/"+ car.id_car, this.authRequest.requestOptions)
            .map((response: Response) => {
                var result = response.text();
                return JSON.parse(result);
            });
    }

}
