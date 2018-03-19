import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
})
export class RateComponent implements OnInit {

    @Input() id_journey: number;
    private rateForm: FormGroup = new FormGroup({});

    constructor(
        private formBulder: FormBuilder
    ) { }

    ngOnInit() {

        this.rateForm = this.formBulder.group({
            rate: ''
        });

    }

    sendRate() {
        let result = this.rateForm.value.rate;
        console.log('getRate : ', result);
    }
}
