import { Component, OnInit } from '@angular/core';

import { Offre } from '../offre';
import { OffreService } from '../offre.service';

@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css']
})
export class OffresComponent implements OnInit {
  offres: Offre[];

  constructor(private offreService: OffreService) { }

  ngOnInit() {
    this.getOffres();
  }

  getOffres(): void {
    this.offreService.getOffres()
    .subscribe(offres => this.offres = offres);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.offreService.addOffre({ name } as Offre)
      .subscribe(offre => {
        this.offres.push(offre);
      });
  }

  delete(offre: Offre): void {
    this.offres = this.offres.filter(h => h !== offre);
    this.offreService.deleteOffre(offre).subscribe();
  }

}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/