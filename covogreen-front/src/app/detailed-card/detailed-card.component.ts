import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detailed-card',
  templateUrl: './detailed-card.component.html',
  styleUrls: ['./detailed-card.component.css']
})
export class DetailedCardComponent implements OnInit {

    constructor() { }

    @Input() id_journey: number;

    ngOnInit() {
    }

}

