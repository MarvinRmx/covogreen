import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const offres = [
      { id: 11, name: 'test', surname : 'test', phone : 'test', hdep : 'test' , dep : 'test' , arr : 'test'}
    ];
    return {offres};
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/