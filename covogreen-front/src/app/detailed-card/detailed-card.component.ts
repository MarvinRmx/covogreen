import { Component, OnInit, Input } from '@angular/core';
import {JourneyService} from '../../services/journey.service';
import {Journey} from '../../class/journey';

/**
 * @author Romain Lembo
 */
@Component({
  selector: 'app-detailed-card',
  templateUrl: './detailed-card.component.html',
  styleUrls: ['./detailed-card.component.css']
})
export class DetailedCardComponent implements OnInit {

    private googleAPIKey = 'AIzaSyCn_4UrHcbZH6TXsuVe15odOdZusR0hUgs';
    private journey: Journey;
    private id_driver: number;

    constructor(
        private journeyService: JourneyService
    ) { }

    ngOnInit() {

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

    getMap() {
        return 'https://www.google.com/maps/embed/v1/directions?' +
            'key=' + this.googleAPIKey +
            '&origin=' + this.journey.origin +
            '&destination=' + this.journey.destination +
            '&avoid=tolls|highways';
    }

}

