import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import * as jwt from 'angular2-jwt-simple';
import {Headers} from "@angular/http";

@Injectable()
export class ChatService {
  private token: string;
  private url = 'http://localhost:1313/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor( private http: HttpClient) {
      this.getHeader();
  }

  getHeader(){
      const token = localStorage.getItem('currentUser');
      this.httpOptions["headers"].append('Content-Type', 'application/json');
      this.httpOptions["headers"].append('Authorization', 'bearer ' + token);
  }

  getMessages(idTrajet: number, nbElement: number): Observable<any> {
    // requete vers le backend /recherche en post avec les information pour demander les "nbElement" derniers messages.
    let jsonData = { 'idTrajet' : idTrajet, 'nbElement' : nbElement};
    return this.http.post(this.url + 'chat/getMessages', jsonData, this.httpOptions);
  }

  getLastMessagesById(idTrajet: number, idMessage: number): Observable<any> {
    let jsonData = { 'idTrajet' : idTrajet, 'idMessage' : idMessage };
    return this.http.post(this.url + 'chat/getLastMessageById', jsonData, this.httpOptions);
  }

  setMessage(idTrajet: number, message: string): Observable<any> {
    let jsonData = { 'idTrajet' : idTrajet, 'message' : message};
    return this.http.post(this.url + 'chat/add', jsonData, this.httpOptions);
  }

  getInfoTrajet(idTrajet: number): Observable<any> {
    let jsonData = { 'idTrajet' : idTrajet};
    return this.http.post(this.url + 'chat/getTrajet', jsonData, this.httpOptions);
  }

}
