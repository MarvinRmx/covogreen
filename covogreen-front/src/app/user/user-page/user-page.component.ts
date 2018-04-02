import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../class/user';
import { Router } from '@angular/router';
import {JourneyService} from '../../../services/journey.service';

@Component({
    selector: 'app-user-page',
    templateUrl: './user-page.component.html',
    styleUrls: ['./user-page.component.css']
})

/**
 * @author Marvin RAMEIX
 * Detail page of an user with info, rating and comments
 */
export class UserPageComponent implements OnInit {

    public displayedColumns = ['user', 'rate', 'comment', 'id_journey', 'dateComment'];

    public rateComments: Object;
    public countDoneJourneys: number;
    public averageRating: string;
    public user: User;

    constructor(protected userService: UserService, private router: Router, protected journeyService: JourneyService) {
    }

    ngOnInit() {
        let id_user = window.location.href.substr(this.userService.getUri().length + 1, window.location.href.length);
        (this.userService.getUserFromId(id_user).subscribe(user => {
                    this.user = user;
                    this.userService.getRateAndCommentFromUserId(user.id_user).subscribe(
                        rateComments => {
                            this.rateComments = rateComments;
                        }
                    );
                    this.userService.countDoneJourneys(user.id_user).subscribe(
                        countDoneJourneys => {
                            this.countDoneJourneys = parseInt(countDoneJourneys.toString(), 0);
                        }
                    );

                    this.userService.getAverageRating(user.id_user).subscribe(
                        averageRating => {
                            this.averageRating = (averageRating !== null) ? parseFloat(averageRating.toString()).toFixed(2) : '0';
                        }
                    );
                }
            )
        );
    }
}
