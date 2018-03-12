import { Component, OnInit } from '@angular/core';
import {JourneyService} from '../../../services/journey.service';

@Component({
  selector: 'app-my-journeys',
  templateUrl: './my-journeys.component.html',
  styleUrls: ['./my-journeys.component.css']
})
export class MyJourneysComponent implements OnInit {

  constructor(
      private journeyService: JourneyService
  ) { }

  ngOnInit() {
      this.journeyService.getJourneysByUser()
          .subscribe(result => {
              console.log('getJourneysByUser : ', result);
          });
  }

}
