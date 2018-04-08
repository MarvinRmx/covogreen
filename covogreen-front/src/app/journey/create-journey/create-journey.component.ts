///<reference path="../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {JourneyService} from '../../../services/journey.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Journey} from '../../../class/journey';

@Component({
    selector: 'app-create-journey',
    templateUrl: './create-journey.component.html',
    styleUrls: ['./create-journey.component.css'],
    providers: [JourneyService],

})
export class CreateJourneyComponent implements OnInit {
    public journey: Journey;
    public createJourneyForm: FormGroup;

    //public createJourneyForm: FormGroup;

    /**
     * @author Marvin RAMEIX
     * @param {FormBuilder} formBuilder
     * @param {JourneyService} journeyService
     */
    constructor(private formBuilder: FormBuilder,
                private journeyService: JourneyService) {
    }

    /**
     * @author Marvin RAMEIX
     *
     */
    ngOnInit() {
        this.createJourneyForm = this.formBuilder.group({
            origin: this.formBuilder.control('', Validators.required),
            destination: this.formBuilder.control('', Validators.required),
            seats_available: this.formBuilder.control('', Validators.required),
            date_journey: this.formBuilder.control('', Validators.required)
        });
    }

    /**
     * @author Marvin RAMEIX
     * Create a journey
     */
    createJourney() {
        this.journey = this.createJourneyForm.value;
        this.journeyService.createJourney(this.createJourneyForm.value)
            .subscribe(result => {
                alert(result);
            });

    }
}
