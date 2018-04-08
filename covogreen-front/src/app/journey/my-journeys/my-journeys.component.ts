import {AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef, Input } from '@angular/core';
import {JourneyService} from '../../../services/journey.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Journey} from '../../../class/journey';
import { NgxSmartModalService } from 'ngx-smart-modal';
import {InscriptionTrajetService} from "../../../services/inscription-trajet.service";
import {JourneyDetailsComponent} from "../journey-details/journey-details.component";

/**
 * @author Romain Lembo
 * Component permettant à l'utiliateur d'avoir un historique des trajets à venir et terminés.
 */
@Component({
    selector: 'app-my-journeys',
    templateUrl: './my-journeys.component.html',
    styleUrls: ['./my-journeys.component.css']
})
export class MyJourneysComponent implements OnInit, AfterViewInit {

    /**
     * Paginigation du tableau.
     */
    @ViewChild(MatPaginator) paginator: MatPaginator;

    /**
     * Identifiant du trajet choisi.
     */
    public id_journey: number;

    /**
     * Colonnes du tableau.
     * @type {string[]}
     */
    public displayedColumns = ['id_journey', 'origin', 'destination', 'date_journey', 'status', 'event', 'access', 'chat', 'cancel'];

    /**
     * Données du tableau.
     * @type {MatTableDataSource<Journey>}
     */
    public dataSource = new MatTableDataSource<Journey>([]);

    constructor(
        private journeyService: JourneyService,
        private inscriptionTrajetService: InscriptionTrajetService,
        private ngxSmartModalService: NgxSmartModalService,
    ) { }

    /**
     * Initialisation du component
     */
    ngOnInit() {
        this.getJourneysByUser();
    }

    /**
     * Raffraichissement du component.
     */
    ngAfterViewInit() {}

    /**
     * Récupération des trajets selon l'utilisateur.
     */
    getJourneysByUser() {
        this.journeyService.getJourneysByUser()
            .subscribe(result => {

                for (let journey of result) {
                    this.journeyService.isDriverThisJourney(journey)
                        .subscribe( is_driver => {
                            journey.is_driver = is_driver;
                        });
                }

                this.dataSource = new MatTableDataSource<Journey>(result);
                this.dataSource.paginator = this.paginator;
            });
    }

    /**
     * Filtre de recherche.
     * @param {string} filterValue
     */
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    /**
     * Vérification de l'état du trajet.
     * @param value
     * @returns {boolean}
     */
    checkHappended(value) {
        let date = new Date(value).getTime();
        let now = Date.now();

        if (now < date) return false;
        else return true;
    }

    /**
     * Traitement de la date du trajet.
     * @param value
     * @returns {string}
     */
    getSchedule(value): string {
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
     * Affichage du statut de l'utilisateur sur le trajet.
     * @param value
     * @returns {string}
     */
    getStatus(value): string {
        if (value) return 'Conducteur';
        return 'Passager';
    }

    /**
     * Affichage du statut du trajet selon à la date actuelle.
     * @param value
     * @returns {string}
     */
    getEvent(value): string {

        let date = new Date(value).getTime();
        let now = Date.now();

        if (now < date) return 'A venir';
        else return 'Terminé';
    }

    /**
     * Affichage du détail du trajet dans une fenêtre flottante.
     * @param id_journey
     */
    getModal_shareJourney(id_journey) {
        this.ngxSmartModalService.getModal('detailedCard').open();
        this.id_journey = id_journey;
    }

    /**
     * Désinscription / Annulation d'un trajet.
     * @param id_journey
     */
    desinscriptionTrajet(id_journey){
        this.inscriptionTrajetService.desinscriptionTrajet(id_journey)
            .subscribe(result => {
                console.log('desinscriptionTrajet : ', result.success);

                if (result.success) {
                    alert('Succès de la désinscription du trajet');
                    this.getJourneysByUser();
                } else alert('Echec de la désinscription du trajet');

            });
    }
}
