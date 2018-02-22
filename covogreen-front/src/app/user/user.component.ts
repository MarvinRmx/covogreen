import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, AbstractControl, FormControl} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CarService } from '../../services/car.service';
import { User } from '../../class/user';
import { Car } from '../../class/car';
import { Router } from '@angular/router';
import * as md5 from 'md5';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    providers: [UserService, CarService]
})
export class UserComponent implements OnInit {

    public user: User;
    public car: Car;

    public have_car: boolean;
    public is_driver: boolean;

    private updateUserForm: FormGroup = new FormGroup({});
    private updatePasswordForm: FormGroup = new FormGroup({});
    private updateOrCreateCarForm: FormGroup = new FormGroup({});

    constructor(
        private router: Router,
        private formBulder: FormBuilder,
        private userService: UserService,
        private carService: CarService,
    ) {}

    ngOnInit() {

        this.updatePasswordForm = this.formBulder.group({
            password: "",
            new_password: "",
        });

        this.updateUserForm = this.formBulder.group({
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            address: "",
            city: "",
            cp: "",
            phone: "",

            is_driver: "false",
            have_car: "false"
        });

        this.updateOrCreateCarForm = this.formBulder.group({
            licencePlate: "",
            make: "",
            model: "",
            capacity: ""
        });

        this.userService.getUser()
            .subscribe(result => {
                this.user = result;
                this.is_driver = this.user.is_driver;
                this.have_car = this.user.id_car !== null ? true : false;

                this.updateUserForm = this.formBulder.group({
                    firstName: this.user.firstName,
                    lastName: this.user.lastName,
                    username: this.user.username,
                    email: this.user.email,
                    address: this.user.address,
                    city: this.user.city,
                    cp: this.user.cp,
                    phone: this.user.phone,

                    is_driver: JSON.stringify(this.user.is_driver),
                    have_car: this.user.id_car !== null ? "true" : "false"
                });

                if(this.have_car) {
                    this.car = new Car(null, null, null, null, null);
                    this.car.id_car = this.user.id_car;

                    this.carService.getCar(this.car)
                        .subscribe(result => {
                            this.car = result;
                            this.updateOrCreateCarForm = this.formBulder.group(this.car);
                        });
                }
            });

    }

    updatePassword() {

        let old_password = "";
        let password = md5(this.updatePasswordForm.value.password);
        let new_password = md5(this.updatePasswordForm.value.new_password);

        this.userService.getUser()
            .subscribe(result => {
                console.log(result);
                old_password = result.password;

                if(old_password === password)
                {
                    this.user.password = new_password;

                    this.userService.updateUser(this.user)
                        .subscribe(result => {
                            alert(result);
                        });
                } else alert("Mot de passe actuel incorrect.");
            });
    }

    updateUser() {

        this.userService.updateUser(this.updateUserForm.value)
            .subscribe(result => {
                alert(result);
            });
    }

    updateOrCreateCar() {


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
