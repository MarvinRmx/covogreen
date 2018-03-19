import {AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import {JourneyService} from '../../../services/journey.service';
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {Journey} from '../../../class/journey';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-my-journeys',
  templateUrl: './my-journeys.component.html',
  styleUrls: ['./my-journeys.component.css']
})
export class MyJourneysComponent implements OnInit, AfterViewInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    public displayedColumns = ['id_journey', 'origin', 'destination', 'date_journey', 'status', 'access', 'cancel'];
    public dataSource = new MatTableDataSource<Journey>([]);

    constructor(
        private journeyService: JourneyService,
        private ngxSmartModalService: NgxSmartModalService
    ) { }

    ngOnInit() {

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

    ngAfterViewInit() {}

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
}
