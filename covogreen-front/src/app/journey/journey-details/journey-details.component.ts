import {Component, NgModule, ViewChild, OnInit} from '@angular/core';
import {Journey} from '../../../class/journey';
import {JourneyService} from '../../../services/journey.service';
import {UserService} from '../../../services/user.service';
import {User} from '../../../class/user';

@Component({
    selector: 'app-journey-details',
    templateUrl: './journey-details.component.html',
    styleUrls: ['./journey-details.component.css'],
})
/**
 * @author Marvin RAMEIX
 * Detail page of a journey with info
 */
export class JourneyDetailsComponent implements OnInit {


    public journey: Journey;
    public driver: User;
    public user: User;
    direction: any;
    constructor(private journeyService: JourneyService, private userService: UserService) {
    }

    ngOnInit() {
        let id_journey = window.location.href.substr(this.journeyService.getUri().length + 1, window.location.href.length);

        this.userService.getUser().subscribe(result => {
            this.user = result;
        });

        this.journeyService.getJourney(id_journey)
            .subscribe(result => {
                this.journey = result;
                this.direction  = {
                    origin: result.origin,
                    destination: result.destination,
                    travelMode: 'DRIVING'
                };
                this.userService.getUserFromId(result.id_driver)
                    .subscribe(res => {
                        this.driver = res;
                    }
                );
            });
    }

    deleteCurrentJourney() {
        if ( this.user.id_user === this.driver.id_user) {
            this.journeyService.deleteJourney(this.journey.id_journey).subscribe(result => {
                console.log(result);
            });
        }
    }
}
