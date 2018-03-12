import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Injectable()
export class InscriptionTrajetService {

  private url = 'http://localhost:1313/';

   httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json'
        })
   };

  constructor( private http: HttpClient) { }

  inscription(token: string, idTrajet: number): Observable<any> {
        console.log("token " + token);
        console.log("idTrajet " + idTrajet);

        // payload de la requete.
        let jsonData = {
            'id_trajet' : idTrajet
        }

      return this.http.post(this.url + 'inscription_trajet', jsonData, this.httpOptions);
  }
}
