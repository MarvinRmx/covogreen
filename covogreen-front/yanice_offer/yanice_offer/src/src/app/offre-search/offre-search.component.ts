import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Offre } from '../offre';
import { OffreService } from '../offre.service';

@Component({
  selector: 'app-offre-search',
  templateUrl: './offre-search.component.html',
  styleUrls: [ './offre-search.component.css' ]
})
export class OffreSearchComponent implements OnInit {
  offres$: Observable<Offre[]>;
  private searchTerms = new Subject<string>();

  constructor(private offreService: OffreService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.offres$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.offreService.searchOffres(term)),
    );
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/