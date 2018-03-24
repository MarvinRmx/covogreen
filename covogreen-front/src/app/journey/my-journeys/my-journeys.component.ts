import {AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {JourneyService} from '../../../services/journey.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Journey} from '../../../class/journey';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {Router} from '@angular/router';

@Component({
    selector: 'app-my-journeys',
    templateUrl: './my-journeys.component.html',
    styleUrls: ['./my-journeys.component.css']
})
export class MyJourneysComponent implements OnInit, AfterViewInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    public displayedColumns = ['id_journey', 'origin', 'destination', 'date_journey', 'status', 'access', 'cancel'];
    public dataSourceToDo = new MatTableDataSource<Journey>([]);
    public dataSourceDone = new MatTableDataSource<Journey>([]);

    constructor(private journeyService: JourneyService,
                private ngxSmartModalService: NgxSmartModalService,
                private router: Router) {
    }

    ngOnInit() {

        this.journeyService.getJourneysByUserToDo()
            .subscribe(result => {

                for (let journey of result) {
                    this.journeyService.isDriverThisJourney(journey)
                        .subscribe(is_driver => {
                            journey.is_driver = is_driver;
                        });
                }

                this.dataSourceToDo = new MatTableDataSource<Journey>(result);
                this.dataSourceToDo.paginator = this.paginator;
            });

        this.journeyService.getJourneysByUserDone()
            .subscribe(result => {
                for (let journey of result) {
                    this.journeyService.isDriverThisJourney(journey)
                        .subscribe(is_driver => {
                            journey.is_driver = is_driver;
                        });
                }

                this.dataSourceDone = new MatTableDataSource<Journey>(result);
                this.dataSourceDone.paginator = this.paginator;
            });
    }

    ngAfterViewInit() {
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSourceToDo.filter = filterValue;
    }

    getSchedule(value): string {

        let date = new Date(value);

        let day = this.journeyService.getDay(date);
        let dayUTC = date.getUTCDate();
        let month = this.journeyService.getMonth(date);
        let hours = date.getHours();
        let minutes = date.getMinutes();

        return day + ' ' + dayUTC + ' ' + month + ', à ' +
            hours + 'h' + minutes;
    }

    getStatus(value): string {
        if (value) return 'Conducteur';
        return 'Passager';
    }

    redirect(id_journey: number) {
        this.router.navigateByUrl('/journey/' + id_journey);
    }
}
