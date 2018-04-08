import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RateService} from '../../../services/rate.service';
import {InscriptionTrajetService} from '../../../services/inscription-trajet.service';
import {InscriptionJourney} from '../../../class/inscriptionJourney';

/**
 * @author Romain Lembo
 * (Component remplacé par JourneyDetails)
 */
@Component({
    selector: 'app-rate',
    templateUrl: './rate.component.html',
})
export class RateComponent implements OnInit {

    /**
     * Récupération de l'identifiant du conducteur.
     * (Depuis le component Detailed-Card)
     */
    @Input() id_journey: number;

    /**
     * Pour vérifier si le trajet est passé ou pas.
     * (Depuis le component Detailed-Card)
     */
    @Input() happended: boolean;

    /**
     * Pour MAJ de la note du conducteur.
     * @param {number} id_driver
     */
    @Input() set id_driver(id_driver: number) {

        if (id_driver != null || id_driver !== undefined || id_driver < 0)
        {
            this.iddriver = id_driver;
            this.getRateByDriver(this.iddriver);
        }
    }

    /**
     * Identifiant local du component du conducteur.
     */
    private iddriver: number;

    /**
     * Note actuelle du conducteur.
     */
    private rateNow: number;

    /**
     * Formulaire de notation.
     * @type {FormGroup}
     */
    private rateForm: FormGroup = new FormGroup({});

    /**
     * Objet InscriptionJourney.
     */
    private inscriptionJourney: InscriptionJourney;

    constructor(
        private formBulder: FormBuilder,
        private rateService: RateService,
        private inscriptionTrajetService: InscriptionTrajetService
    ) { }

    /**
     * Inialisation du component
     */
    ngOnInit() {
        this.rateForm = this.formBulder.group({
            rate: ''
        });

        this.getInscriptionJourneyByJourneyAndUser();
    }

    /**
     * Récupération de la note du conducteur.
     * @param id_driver
     */
    getRateByDriver(id_driver) {
        this.rateService.getRateByDriver(id_driver)
            .subscribe(result => {
                this.rateNow = result;
            });
    }

    /**
     * Récupération du l'inscription selon le trajet et le conducteur.
     */
    getInscriptionJourneyByJourneyAndUser() {
        this.inscriptionTrajetService.getInscriptionJourneyByJourneyAndUser(this.id_journey)
            .subscribe(result => {
                this.inscriptionJourney = result;
            });
    }

    /**
     * Envoie de la notation de l'utilisateur.
     */
    postRateByDriver() {
        let rate = this.rateForm.value.rate;
        this.inscriptionJourney.rate = rate;

        this.rateService.postRateByDriver(this.inscriptionJourney)
            .subscribe(result => {
                alert(result);
                this.getRateByDriver(this.iddriver);
            });
    }
}
