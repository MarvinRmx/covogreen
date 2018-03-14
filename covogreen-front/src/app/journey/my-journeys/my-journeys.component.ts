import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {JourneyService} from '../../../services/journey.service';
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {Journey} from '../../../class/journey';

@Component({
  selector: 'app-my-journeys',
  templateUrl: './my-journeys.component.html',
  styleUrls: ['./my-journeys.component.css']
})
export class MyJourneysComponent implements OnInit, AfterViewInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    public displayedColumns = ['id_journey', 'origin', 'destination', 'date_journey'];
    public dataSource = new MatTableDataSource<Journey>([]);

    constructor(
        private journeyService: JourneyService
    ) { }

      ngOnInit() {
          this.journeyService.getJourneysByUser()
              .subscribe(result => {
                  this.dataSource = new MatTableDataSource<Journey>(result);
                  this.dataSource.paginator = this.paginator;
                  console.log('getJourneysByUser : ', result);
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
        console.log('getSchedule : ', date.getUTCDate());

        let day = this.journeyService.getDay(date);
        let dayUTC = date.getUTCDate();
        let month = this.journeyService.getMonth(date);
        let hours = date.getHours();
        let minutes = date.getMinutes();

        return  day + ' ' + dayUTC + ' ' + month + ', à ' +
                hours + 'h' + minutes;
    }
}
