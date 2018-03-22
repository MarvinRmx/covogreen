import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutonInscriptionComponent } from './bouton-inscription.component';

describe('BoutonInscriptionComponent', () => {
  let component: BoutonInscriptionComponent;
  let fixture: ComponentFixture<BoutonInscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoutonInscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoutonInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
