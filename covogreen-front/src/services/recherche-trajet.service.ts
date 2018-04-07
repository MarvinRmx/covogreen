import { Injectable } from '@angular/core';
import {RechercheFormEnt} from '../class/RechercheFormEnt';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {AuthRequest} from './authrequest.service';

@Injectable()
export class RechercheTrajetService {

  private url = 'http://localhost:1313/';

  constructor(
      private http: Http,
      private authRequest: AuthRequest
  ) { }

  getTrajets(recherche: RechercheFormEnt, page: number): Observable<any> {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

        // requete vers le backend /recherche en post avec les information de la recherche.
        let jsonData = {
            'depart' : recherche.depart,
            'destination' : recherche.destination,
            'date_trajet' : recherche.date_trajet,
            'place_libre' : recherche.place_libre,
            'page' : page,
        }

        console.log(jsonData);

        return this.http.post(this.url + 'recherche', jsonData, this.authRequest.requestOptions)
            .map((response: Response) => {
                return JSON.parse(response.text());
            });
  }
}
