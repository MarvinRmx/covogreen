import {AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef, Input } from '@angular/core';
import {JourneyService} from '../../../services/journey.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Journey} from '../../../class/journey';
import { NgxSmartModalService } from 'ngx-smart-modal';
import {InscriptionTrajetService} from "../../../services/inscription-trajet.service";

/**
 * @author Romain Lembo
 */
@Component({
  selector: 'app-my-journeys',
  templateUrl: './my-journeys.component.html',
  styleUrls: ['./my-journeys.component.css']
})
export class MyJourneysComponent implements OnInit, AfterViewInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    public id_journey: number;
    public displayedColumns = ['id_journey', 'origin', 'destination', 'date_journey', 'status', 'event', 'access', 'chat', 'cancel'];
    public dataSource = new MatTableDataSource<Journey>([]);

    constructor(
        private journeyService: JourneyService,
        private inscriptionTrajetService: InscriptionTrajetService,
        private ngxSmartModalService: NgxSmartModalService
    ) { }

    ngOnInit() {
        this.getJourneysByUser();
    }

    ngAfterViewInit() {}

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

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

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

    getStatus(value): string {
        if (value) return 'Conducteur';
        return 'Passager';
    }

    getEvent(value): string {

        let date = new Date(value);
        let now = Date.now();

        if (now < date.getTime()) return 'A venir';
        else return 'Terminé';
    }

    getModal_shareJourney(id_journey) {
        this.ngxSmartModalService.getModal('detailedCard').open();
        this.id_journey = id_journey;
    }

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
