import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RateService} from '../../../services/rate.service';
import {InscriptionTrajetService} from '../../../services/inscription-trajet.service';
import {InscriptionJourney} from '../../../class/inscriptionJourney';

/**
 * @author Romain Lembo
 */
@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
})
export class RateComponent implements OnInit {

    @Input() id_journey: number;

    @Input() happended: boolean;

    @Input() set id_driver(id_driver: number) {

        if (id_driver != null || id_driver !== undefined || id_driver < 0)
        {
            this.iddriver = id_driver;
            this.getRateByDriver(this.iddriver);
        }
    }

    private iddriver: number;
    private rateNow: number;
    private rateForm: FormGroup = new FormGroup({});
    private inscriptionJourney: InscriptionJourney;

    constructor(
        private formBulder: FormBuilder,
        private rateService: RateService,
        private inscriptionTrajetService: InscriptionTrajetService
    ) { }

    ngOnInit() {
        this.rateForm = this.formBulder.group({
            rate: ''
        });

        this.getInscriptionJourneyByJourneyAndUser();
    }

    getRateByDriver(id_driver) {
        this.rateService.getRateByDriver(id_driver)
            .subscribe(result => {
                this.rateNow = result;
            });
    }

    getInscriptionJourneyByJourneyAndUser() {
        this.inscriptionTrajetService.getInscriptionJourneyByJourneyAndUser(this.id_journey)
            .subscribe(result => {
                this.inscriptionJourney = result;
            });
    }

    postRateByDriver() {
        let rate = this.rateForm.value.rate;
        this.inscriptionJourney.rate = rate;

        this.rateService.postRateByDriver(this.inscriptionJourney)
            .subscribe(result => {
                alert(result);
                this.getRateByDriver(this.iddriver);
            });
    }

    checkIsEvent() {

    }
}
