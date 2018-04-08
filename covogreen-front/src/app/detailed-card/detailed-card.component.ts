import { Component, OnInit, Input } from '@angular/core';
import {JourneyService} from '../../services/journey.service';
import {Journey} from '../../class/journey';
import {MyJourneysComponent} from "../journey/my-journeys/my-journeys.component";

/**
 * @author Romain Lembo
 * Component principal du détail d'un trajet sélectionné.
 */
@Component({
    selector: 'app-detailed-card',
    templateUrl: './detailed-card.component.html',
    styleUrls: ['./detailed-card.component.css']
})
export class DetailedCardComponent implements OnInit {

    private googleAPIKey = 'AIzaSyCn_4UrHcbZH6TXsuVe15odOdZusR0hUgs';

    /**
     * Objet journey
     */
    private journey: Journey;

    /**
     * Récupération de l'identifiant du conducteur.
     */
    private id_driver: number;

    /**
     * Pour vérifier si le trajet est passé ou pas.
     */
    private happended: boolean;

    constructor(
        private journeyService: JourneyService
    ) { }

    /**
     * Inialisation du component
     */
    ngOnInit() {
        this.happended = false;
    }

    @Input() set id_journey(id_journey: number) {

        if (id_journey != null || id_journey !== undefined)
        {
            this.journeyService.getJourneysByID(id_journey)
                .subscribe(result => {
                    this.journey = result;
                    this.id_driver = this.journey.id_driver;
                });
        }
    }

    /**
     * Pour modifier la valeur de la variable "happended".
     * @param value
     */
    setHappended(value) {

        let date = new Date(value);
        let now = Date.now();

        if (now < date.getTime()) this.happended = false;
        else this.happended = true;
    }

    /**
     * Récupération de la date du trajet et traitement de son information.
     * @param value
     * @returns {string}
     */
    getSchedule(value): string {
        this.setHappended(value);

        let date = new Date(value);

        let day = this.journeyService.getDay(date);
        let dayUTC = date.getUTCDate();
        let month = this.journeyService.getMonth(date);
        let hours = date.getHours();
        let minutes = date.getMinutes();

        return  day + ' ' + dayUTC + ' ' + month + ', à ' +
            hours + 'h' + minutes;
    }

    /**
     * API Google Map (Remplacé par le component JourneyDetails)
     * @returns {string}
     */
    getMap() {
        return 'https://www.google.com/maps/embed/v1/directions?' +
            'key=' + this.googleAPIKey +
            '&origin=' + this.journey.origin +
            '&destination=' + this.journey.destination +
            '&avoid=tolls|highways';
    }

}

