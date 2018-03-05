import { Component, OnInit } from '@angular/core';
import {RechercheFormEnt} from '../../class/RechercheFormEnt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recherche-form',
  templateUrl: './recherche-form.component.html',
  styleUrls: ['./recherche-form.component.css']
})
export class RechercheFormComponent implements OnInit {
  rechercheFormEnt: RechercheFormEnt;

  constructor( private router: Router) {
    this.rechercheFormEnt = new RechercheFormEnt();
  }

  ngOnInit() {
  }

   onSubmit() {
       // On effectue une redirection vers la page /recherche en lui passant en parametre les valeurs renseigné dans la form.
       this.router.navigate(['recherche'], {
           queryParams: {
                'depart': this.rechercheFormEnt.depart,
                'destination': this.rechercheFormEnt.destination,
                'date_trajet': this.rechercheFormEnt.date_trajet,
                'place_libre': this.rechercheFormEnt.place_libre,
                'page': 1
           }
       });
   }

  // A supprimer.
  get diagnostic() {
    return JSON.stringify(this.rechercheFormEnt);
  }
}
