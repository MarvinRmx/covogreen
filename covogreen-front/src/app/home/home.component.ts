import { Component, OnInit } from '@angular/core';

/**
 * @author Romain Lembo
 */
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    title = 'Dashboard';

    constructor() {}

    ngOnInit() {
    }

}
