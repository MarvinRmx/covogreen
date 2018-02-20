import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {RechercheFormEnt} from '../../class/RechercheFormEnt';
import {RechercheTrajetService} from '../../services/recherche-trajet.service';
import {isNullOrUndefined} from 'util';
import {TrajetEnt} from '../../class/TrajetEnt';

@Component({
  selector: 'app-recherche-page',
  templateUrl: './recherche-page.component.html',
  styleUrls: ['./recherche-page.component.css'],
    providers: [RechercheTrajetService]
})
export class RecherchePageComponent implements OnInit {
  rechercheFormEnt: RechercheFormEnt;
  offres: TrajetEnt[];

  error: boolean;
  messagesErreur: string[];
  submitted: boolean;

  nb_total_page: number[];
  currentPage: number;

  constructor(private route: ActivatedRoute, private rechercheService: RechercheTrajetService, private router: Router) {
      this.rechercheFormEnt = new RechercheFormEnt(null, null, false, null);
      this.offres = [];
      this.error = false;
      this.submitted = false;
      this.nb_total_page = [];
  }

  get diagnostic() {
      return JSON.stringify(this.offres);
  }

  loadTrajets(){
      // On récupère les informations passé en paramètre/
      this.route.queryParams.subscribe(params => {

              //if ( !isNullOrUndefined(params.depart) && !isNullOrUndefined(params.destination) && !isNullOrUndefined(params.date_trajet) && !isNullOrUndefined(params.place_libre) && !isNullOrUndefined(params.page) ) {
        this.rechercheFormEnt.depart = params.depart;
        this.rechercheFormEnt.destination = params.destination;
        this.rechercheFormEnt.date_trajet = params.date_trajet;
        this.rechercheFormEnt.place_libre = params.place_libre;
        this.currentPage = params.page;

        // On récupère les trajets depuis le backend.
        this.rechercheService.getTrajets(this.rechercheFormEnt, this.currentPage).subscribe(
        (res: Response) => { // on récupère la réponse.
            this.submitted = true;
            // On vérifie la variable 'success'.
            // Offres existantent.
            if (res['success'] === true) {
                // On stocke les trajet dans la variables offres.
                this.offres = <TrajetEnt[]>res['trajets'];
                this.error = false;
                this.createArrayPagination(res['nb_total_page']);
            } else if (res['success'] === false) {
                // On affiche le message d'erreur
                // Aucune offre ou autre
                this.error = true;
                this.messagesErreur = <string[]>res['message'];
                }
            });
             // } else {
               //   console.log('recherche-page-component.tx : Formulaire non envoyé');
              //}
          }
      );
  }

  ngOnInit() {
      this.loadTrajets();
  }

  createArrayPagination(num: number) {
      for (let i = 1; i <= num; i++) {
        this.nb_total_page[i - 1] = i;
      }
  }

    paginationPage(page: number) {
      this.router.navigate(['/recherche'], {
          queryParams: {
              'depart': this.rechercheFormEnt.depart,
              'destination': this.rechercheFormEnt.destination,
              'date_trajet': this.rechercheFormEnt.date_trajet,
              'place_libre': this.rechercheFormEnt.place_libre,
              'page': page
          }
      });
    }
}
