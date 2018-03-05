import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ChatService {

  private url = 'http://localhost:1313/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor( private http: HttpClient) { }

  getMessages(idTrajet: number, nbElement: number): Observable<any> {
    // requete vers le backend /recherche en post avec les information pour demander les "nbElement" derniers messages.
    let jsonData = { 'idTrajet' : idTrajet, 'nbElement' : nbElement }
    return this.http.post(this.url + 'chat/getMessages', jsonData, this.httpOptions);
  }

  getLastMessagesById(idTrajet: number, idMessage: number): Observable<any> {
    let jsonData = { 'idTrajet' : idTrajet, 'idMessage' : idMessage }
    return this.http.post(this.url + 'chat/getLastMessageById', jsonData, this.httpOptions);
  }

  setMessage(idTrajet: number, message: string): Observable<any> {
    let jsonData = { 'idTrajet' : idTrajet, 'message' : message }
    return this.http.post(this.url + 'chat/add', jsonData, this.httpOptions);
  }

}
