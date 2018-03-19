import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {AuthRequest} from "./authrequest.service";

@Injectable()
export class InscriptionTrajetService {

    private uri;

    constructor( private http: Http, private authRequest: AuthRequest ) {
        this.uri = "http://localhost:1313/";
    }

    // Effectue une requete vers le serveur pour inscrire un user à l'offre.
    inscription(idTrajet: number): Observable<any> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        let jsonData = {
            'idTrajet' : idTrajet
        }

        return this.http.post(this.uri + 'inscriptionTrajet', jsonData, this.authRequest.requestOptions);
    }

    // Effectue une requete vers le serveur pour vérifier qu'un user est inscrit ou pas.
    verifInscription(idTrajet: number): Observable<any> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        let jsonData = {
            'idTrajet' : idTrajet
        }

        return this.http.post(this.uri + 'inscriptionTrajet/verif', jsonData, this.authRequest.requestOptions);
    }

    // Effectue une requete vers le serveur pour désinscrire un user à l'offre.
    desinscriptionTrajet(idTrajet: number): Observable<any> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        let jsonData = {
            'idTrajet' : idTrajet
        }

        return this.http.post(this.uri + 'desinscriptionTrajet', jsonData, this.authRequest.requestOptions);
    }}
