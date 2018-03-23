import {Component, NgModule, ViewChild, OnInit} from '@angular/core';
import {Journey} from '../../../class/journey';
import {JourneyService} from '../../../services/journey.service';
import { DirectionsRenderer } from '@ngui/map';

import {Router} from '@angular/router';

@Component({
    selector: 'app-journey-details',
    templateUrl: './journey-details.component.html',
    styleUrls: ['./journey-details.component.css'],
})
export class JourneyDetailsComponent implements OnInit {


    public journey: Journey;
    direction: any;
    constructor(private journeyService: JourneyService) {
    }

    ngOnInit() {
        let id_journey = window.location.href.substr(this.journeyService.getUri().length + 1, window.location.href.length);

        this.journeyService.getJourney(id_journey)
            .subscribe(result => {
                this.journey = result;
                this.direction  = {
                    origin: result.origin,
                    destination: result.destination,
                    travelMode: 'DRIVING'
                };
            });


    }
}
