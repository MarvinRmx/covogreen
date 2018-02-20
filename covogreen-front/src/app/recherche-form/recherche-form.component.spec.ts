import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheFormComponent } from './recherche-form.component';

describe('RechercheFormComponent', () => {
  let component: RechercheFormComponent;
  let fixture: ComponentFixture<RechercheFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechercheFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechercheFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
