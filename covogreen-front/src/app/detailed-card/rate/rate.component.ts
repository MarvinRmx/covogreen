import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RateService} from '../../../services/rate.service';

/**
 * @author Romain Lembo
 */
@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
})
export class RateComponent implements OnInit {

    @Input() id_journey: number;

    @Input() set id_driver(id_driver: number) {

        if (id_driver != null || id_driver !== undefined || id_driver < 0)
        {
            this.rateService.getRateByDriver(id_driver)
                .subscribe(result => {
                    this.rateNow = result;
                });
        }
    }

    private rateNow: number;
    private rateForm: FormGroup = new FormGroup({});

    constructor(
        private formBulder: FormBuilder,
        private rateService: RateService
    ) { }

    ngOnInit() {

        this.rateService.getRateByDriver(8)
            .subscribe(result => {
                console.log('getRateByDriver : ', result);
            });

        this.rateForm = this.formBulder.group({
            rate: ''
        });

    }

    sendRate() {
        let result = this.rateForm.value.rate;
        console.log('getRate : ', result);
    }
}
