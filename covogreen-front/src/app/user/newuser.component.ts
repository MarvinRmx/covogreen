import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CarService } from '../../services/car.service';
import { User } from '../../class/user';
import { Car } from '../../class/car';
import * as md5 from 'md5';


/**
 * @author Romain Lembo
 */
@Component({
    selector: 'app-newuser',
    templateUrl: './newuser.component.html',
    providers: [UserService, CarService]

})

export class NewuserComponent implements OnInit {

    public user: User;
    public car: Car;

    public have_car: boolean = false;
    public have_car_ctrl: FormControl;

    public is_driver: boolean;
    public is_driver_ctrl: FormControl;

    public createUserForm: FormGroup;

    constructor(
        private formBulder: FormBuilder,
        private userService: UserService,
    ) { }

    ngOnInit() {

        this.have_car_ctrl = this.formBulder.control('');
        this.is_driver_ctrl = this.formBulder.control('');

        this.createUserForm = this.formBulder.group({
            username: this.formBulder.control('', Validators.required),
            email: this.formBulder.control('', Validators.required),
            firstName: this.formBulder.control('', Validators.required),
            lastName: this.formBulder.control('', Validators.required),
            password: this.formBulder.control('', Validators.required),
            city: this.formBulder.control('', Validators.required),
            address: this.formBulder.control('', Validators.required),
            cp: this.formBulder.control('', Validators.required),
            phone: this.formBulder.control('', Validators.required),
            is_driver: 'false',
            have_car: 'false',

            licencePlate: this.formBulder.control(''),
            make: this.formBulder.control(''),
            model: this.formBulder.control(''),
            capacity: this.formBulder.control('')
        });

    }

    createUser() {
        this.user = this.createUserForm.value;
        this.car = this.createUserForm.value;
        this.user.password = md5(this.createUserForm.value.password);

        this.userService.createUser(this.user, this.car)
            .subscribe(result => {
                alert(result);
                this.user.password = '';
            });
    }

    changeIsDriver($event): void {
        this.is_driver = JSON.parse($event.value);
    }

    changeHaveCar($event): void {
        this.have_car = JSON.parse($event.value);
    }

    checkIsDriver(): boolean {
        return this.is_driver;
    }

    checkHaveCar(): boolean {
        return this.have_car;
    }
}
