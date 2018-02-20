import { TestBed, inject } from '@angular/core/testing';

import { RechercheTrajetService } from './recherche-trajet.service';

describe('RechercheTrajetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RechercheTrajetService]
    });
  });

  it('should be created', inject([RechercheTrajetService], (service: RechercheTrajetService) => {
    expect(service).toBeTruthy();
  }));
});
