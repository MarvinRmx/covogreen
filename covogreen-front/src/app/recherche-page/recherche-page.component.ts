import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {RechercheFormEnt} from '../../class/RechercheFormEnt';
import {RechercheTrajetService} from '../../services/recherche-trajet.service';
import {isNullOrUndefined} from 'util';
import {TrajetEnt} from '../../class/TrajetEnt';
import {InscriptionTrajetService} from '../../services/inscription-trajet.service';

@Component({
    selector: 'app-recherche-page',
    templateUrl: './recherche-page.component.html',
    styleUrls: ['./recherche-page.component.css'],
    providers: [RechercheTrajetService, InscriptionTrajetService]
})
export class RecherchePageComponent implements OnInit {
    rechercheFormEnt: RechercheFormEnt;
    offres: TrajetEnt[];

    error: boolean;
    messagesErreur: string[];
    submitted: boolean;

    nb_total_page: number[];
    currentPage: number;

    constructor(private route: ActivatedRoute, private rechercheService: RechercheTrajetService, private inscriptionService: InscriptionTrajetService, private router: Router) {
        this.rechercheFormEnt = new RechercheFormEnt(null, null, false, null);
        this.offres = [];
        this.error = false;
        this.submitted = false;
        this.nb_total_page = [];
    }

    ngOnInit() {
        // On récupère les informations passé en paramètre
        this.route.queryParams.subscribe(params => {
            // L'utilisateur a complété les champs du formulaire.
            if(params.depart && params.destination && params.date_trajet && params.place_libre && params.page){
                this.loadTrajets(new RechercheFormEnt(
                    params.depart,
                    params.destination,
                    params.date_trajet,
                    params.place_libre
                ), params.page);
            }else{
                // Première visite sur la page recherche.
                this.loadTrajets(new RechercheFormEnt(
                    "",
                    "",
                    false,
                    ""
                ), 1);
            }
        });
    }

    /**
     * Récupère les trajets pour une recherche donnée depuis le serveur.
     *
     * @param {RechercheFormEnt} rechercheEnt
     * @param {number} page
     */
    loadTrajets(rechercheEnt: RechercheFormEnt, page: number){
        this.rechercheFormEnt.depart      = rechercheEnt.depart;
        this.rechercheFormEnt.destination = rechercheEnt.destination;
        this.rechercheFormEnt.date_trajet = rechercheEnt.date_trajet;
        this.rechercheFormEnt.place_libre = rechercheEnt.place_libre;
        this.currentPage                  = page;

        // On récupère les trajets depuis le backend.
        this.rechercheService.getTrajets(this.rechercheFormEnt, this.currentPage).subscribe((res: Response) => { // on récupère la réponse.
            this.submitted = true;
            // On vérifie la variable 'success'.
            // Offres existantent.
            if (res['success'] === true) {
                // On stocke les trajets dans la variables offres.
                this.offres   = <TrajetEnt[]>res['trajets'];
                this.error    = false;
                this.createArrayPagination(res['nb_total_page']);
            } else if (res['success'] === false) {
                // On affiche le message d'erreur
                // Aucune offre ou autre
                this.error = true;
                this.messagesErreur = <string[]>res['message'];
            }
        });
    }

    /**
     * Permet de créer les boutons dans la partie pagination.
     *
     * @param {number} num
     */
    createArrayPagination(num: number) {
        for (let i = 1; i <= num; i++) {
            this.nb_total_page[i - 1] = i;
        }
    }

    /**
     * Methode appelé lorsqu'un utilisateur clique sur un lien dans la partie pagination.
     *
     * @param {number} page
     */
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

    /**
     * Methode executé lorsqu'un utilisateur clique sur le bouton pour s'inscrire à une offre
     */
    inscriptionTrajet(event, offre: TrajetEnt) {
        let token = localStorage.getItem('currentUser');

        console.log(event);

        // un utilisateur est loggé
        if (token != null) {
            // On inscription l'utilisateur.
            this.inscriptionService.inscription(token, offre.id).subscribe((res: Response) => { // on récupère la réponse.
                console.log(res);
            });
        }else{
            // l'utilisateur n'est pas loggé, on affiche une erreur.
            this.error = true;
            this.messagesErreur = ['Veillez vous connecter pour participer à cette offre.'];
        }

        console.log(offre);
    }
}
