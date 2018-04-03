import {Component, NgModule, ViewChild, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
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
export class JourneyDetailsComponent implements OnInit, OnChanges {


    @Input() id_journey: number;

    @Input() set id_driver(id_driver: number) {

        if (id_driver != null || id_driver !== undefined || id_driver < 0)
        {
            this.iddriver = id_driver;
            this.getUserFromId(this.iddriver);
        }
    }

    private iddriver: number;

    public journey: Journey;
    public driver: User;
    public user: User;
    public canRateAndComment: boolean;
    public direction: any;
    public rateAndCommentForm;

    constructor(protected journeyService: JourneyService, private userService: UserService,
                private formBuilder: FormBuilder, private router: Router) {
    }

    ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes) {

            let id_journey = propName === 'id_journey' ? changes[propName] : null;

            if (id_journey) {
                if (id_journey.previousValue !== id_journey.currentValue) {
                    this.getJourney(id_journey.currentValue);
                }
            }
        }
    }

    ngOnInit() {
        //let id_jour;ney = window.location.href.substr(this.journeyService.getUri().length + 1, window.location.href.length);

        this.rateAndCommentForm = this.formBuilder.group({
            rate: this.formBuilder.control(''),
            comment: this.formBuilder.control('')
        });

        this.userService.getUser().subscribe(result => {
            this.user = result;
        });

        this.getJourney(this.id_journey);
        //this.getJourney(id_journey);
    }

    getJourney(id_journey) {

        //this.journeyService.getJourney(id_journey)
        this.journeyService.getJourneysByID(id_journey)
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

                this.getUserFromId(this.journey.id_driver);
            });
    }

    getUserFromId(id_driver) {
        this.userService.getUserFromId(id_driver)
            .subscribe(res => {
                    this.driver = res;
                    this.userService.getRateAndCommentFromUserId(this.driver.id_user).subscribe();
                }
            );
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
