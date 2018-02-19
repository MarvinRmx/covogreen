import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Offre }         from '../offre';
import { OffreService }  from '../offre.service';

@Component({
  selector: 'app-offre-detail',
  templateUrl: './offre-detail.component.html',
  styleUrls: [ './offre-detail.component.css' ]
})
export class OffreDetailComponent implements OnInit {
  @Input() offre: Offre;

  constructor(
    private route: ActivatedRoute,
    private offreService: OffreService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getOffre();
  }

  getOffre(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    const name = +this.route.snapshot.paramMap.get('name');
    const surname = +this.route.snapshot.paramMap.get('surname');

    this.offreService.getOffre(id, name, surname)
      .subscribe(offre => this.offre = offre);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.offreService.updateOffre(this.offre)
      .subscribe(() => this.goBack());
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/