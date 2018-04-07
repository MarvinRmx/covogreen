import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {RechercheTrajetService} from "../../services/recherche-trajet.service";
import {TrajetEnt} from "../../class/TrajetEnt";
import {RechercheFormEnt} from "../../class/RechercheFormEnt";
import {JourneyService} from "../../services/journey.service";
import {Journey} from "../../class/journey";

/**
 * @author Mohamed EL karmoudi
 */
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [RechercheTrajetService]
})

export class HomeComponent implements OnInit {

    title = 'Dashboard';
    offres: TrajetEnt[];
    //offres: Array<Journey>;
;
    constructor(
        private rechercheService: RechercheTrajetService,
        private journeyService: JourneyService
    ) {}

    ngOnInit() {
        this.loadTrajets(new RechercheFormEnt( "",  "",  false,  ""), 1);
    }

    /*loadTrajets(rechercheEnt: RechercheFormEnt, page: number) {

        this.journeyService.getJourneys()
            .subscribe(result => {
                this.offres = result;
                console.log(this.offres);
            });
    }*/

    loadTrajets(rechercheEnt: RechercheFormEnt, page: number) {
        // On récupère les trajets depuis le backend.
        this.rechercheService.getTrajets(rechercheEnt, 1)
            .subscribe((res: Response) => { // on récupère la réponse.
                // On vérifie la variable 'success'.
                // Offres existantent.
                if (res['success'] === true) {
                    // On stocke les trajets dans la variables offres.
                    this.offres   = <TrajetEnt[]>res['trajets'];
                } else if (res['success'] === false) {
                    // on ne fait rien
                }
            });
    }


}
