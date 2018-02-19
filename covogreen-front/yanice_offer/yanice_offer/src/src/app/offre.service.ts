import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Offre } from './offre';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class OffreService {

  private offresUrl = 'api/offres';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET offres from the server */
  getOffres(): Observable<Offre[]> {
    return this.http.get<Offre[]>(this.offresUrl)
      .pipe(
      tap(offres => this.log(`fetched offres`)),
      catchError(this.handleError('getOffres', []))
      );
  }

  /** GET offre by id. Return `undefined` when id not found */
  getOffreNo404<Data>(id: number): Observable<Offre> {
    const url = `${this.offresUrl}/?id=${id}`;
    return this.http.get<Offre[]>(url)
      .pipe(
      map(offres => offres[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} offre id=${id}`);
      }),
      catchError(this.handleError<Offre>(`getOffre id=${id}`))
      );
  }

  /** GET offre by id. Will 404 if id not found */
  getOffre(id: number): Observable<Offre> {
    const url = `${this.offresUrl}/${id} + /${name}`;
    
    return this.http.get<Offre>(url).pipe(
      tap(_ => this.log(`fetched offre id=${id}`)),
      catchError(this.handleError<Offre>(`getOffre id=${id} + getOffre name=${name}`))
    );
  }

  /* GET offres whose name contains search term */
  searchOffres(term: string): Observable<Offre[]> {
    if (!term.trim()) {
      // if not search term, return empty offre array.
      return of([]);
    }
    return this.http.get<Offre[]>(`api/offres/?name=${term}`).pipe(
      tap(_ => this.log(`found offres matching "${term}"`)),
      catchError(this.handleError<Offre[]>('searchOffres', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new offre to the server */
  addOffre(offre: Offre): Observable<Offre> {
    return this.http.post<Offre>(this.offresUrl, offre, httpOptions).pipe(
      tap((offre: Offre) => this.log(`added offre w/ id=${offre.id}`)),
      catchError(this.handleError<Offre>('addOffre'))
    );
  }

  /** DELETE: delete the offre from the server */
  deleteOffre(offre: Offre | number): Observable<Offre> {
    const id = typeof offre === 'number' ? offre : offre.id;
    const url = `${this.offresUrl}/${id}`;

    return this.http.delete<Offre>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted offre id=${id}`)),
      catchError(this.handleError<Offre>('deleteOffre'))
    );
  }

  /** PUT: update the offre on the server */
  updateOffre(offre: Offre): Observable<any> {
    return this.http.put(this.offresUrl, offre, httpOptions).pipe(
      tap(_ => this.log(`updated offre id=${offre.id}`)),
      catchError(this.handleError<any>('updateOffre'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a OffreService message with the MessageService */
  private log(message: string) {
    this.messageService.add('OffreService: ' + message);
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/