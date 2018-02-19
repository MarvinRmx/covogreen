import { Component, OnInit } from '@angular/core';
import { Offre } from '../offre';
import { OffreService } from '../offre.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  offres: Offre[] = [];

  constructor(private offreService: OffreService) { }

  ngOnInit() {
    this.getOffres();
  }

  getOffres(): void {
    this.offreService.getOffres()
      .subscribe(offres => this.offres = offres.slice(1, 5));
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/