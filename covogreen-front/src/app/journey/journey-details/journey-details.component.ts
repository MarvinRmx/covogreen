import {Component, NgModule, ViewChild, OnInit} from '@angular/core';
import {Journey} from '../../../class/journey';
import {JourneyService} from '../../../services/journey.service';
import {UserService} from '../../../services/user.service';
import {User} from '../../../class/user';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';


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
    public canRateAndComment: boolean;
    direction: any;
    public rateAndCommentForm;

    constructor(protected journeyService: JourneyService, private userService: UserService,
                private formBuilder: FormBuilder, private router: Router) {
    }

    ngOnInit() {
        let id_journey = window.location.href.substr(this.journeyService.getUri().length + 1, window.location.href.length);

        this.rateAndCommentForm = this.formBuilder.group({
            rate: this.formBuilder.control(''),
            comment: this.formBuilder.control('')
        });

        this.userService.getUser().subscribe(result => {
            this.user = result;
        });

        this.journeyService.getJourney(id_journey)
            .subscribe(result => {
                this.journey = result;
                this.direction = {
                    origin: result.origin,
                    destination: result.destination,
                    travelMode: 'DRIVING'
                };
                this.journeyService.canRateAndComment(id_journey).subscribe(res => {
                    this.canRateAndComment = (res === 'true' && (new Date(Date.now()) > new Date(this.journey.date_journey)));
                });

                this.userService.getUserFromId(result.id_driver)
                    .subscribe(res => {
                            this.driver = res;
                            this.userService.getRateAndCommentFromUserId(this.driver.id_user).subscribe();
                        }
                    );
            });
    }

    deleteCurrentJourney() {
        if (this.user.id_user === this.driver.id_user) {
            this.journeyService.deleteJourney(this.journey.id_journey).subscribe(result => {
            });
        }
    }

    rateAndComment() {
        this.journeyService.rateAndComment(this.rateAndCommentForm.value, this.journey.id_journey)
            .subscribe(result => {
                alert(result);
            });
    }
}
