import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, AbstractControl, FormControl} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CarService } from '../../services/car.service';
import { User } from '../../class/user';
import { Car } from '../../class/car';
import { Router } from '@angular/router';
import * as md5 from 'md5';

/**
 * @author Romain Lembo
 * Component principal de la gestion de profil d'un utilisateur.
 */
@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    providers: [UserService, CarService]
})
export class UserComponent implements OnInit {

    /**
     * Objet User.
     */
    public user: User;

    /**
     * Objet Car.
     */
    public car: Car;

    /**
     * Si l'utilisateur a une voiture.
     */
    public have_car: boolean;

    /**
     * Si l'utilisateur est conducteur.
     */
    public is_driver: boolean;

    /**
     * Formulaire de MAJ de l'utilisateur.
     * @type {FormGroup}
     */
    private updateUserForm: FormGroup = new FormGroup({});

    /**
     * Formulaire de MAJ du mot de passe.
     * @type {FormGroup}
     */
    private updatePasswordForm: FormGroup = new FormGroup({});

    /**
     * Formulaire de MAJ ou de création de la voiture.
     * @type {FormGroup}
     */
    private updateOrCreateCarForm: FormGroup = new FormGroup({});

    constructor(
        private router: Router,
        private formBulder: FormBuilder,
        private userService: UserService,
        private carService: CarService,
    ) {}

    /**
     * Initialisation du component.
     */
    ngOnInit() {

        this.updatePasswordForm = this.formBulder.group({
            password: '',
            new_password: '',
        });

        this.updateUserForm = this.formBulder.group({
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            address: '',
            city: '',
            cp: '',
            phone: '',

            is_driver: 'false',
            have_car: 'false'
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

                this.car = new Car(null, null, null,  null, null);

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

    /**
     * MAJ du mot de passe.
     */
    updatePassword() {

        let old_password = "";
        let password = md5(this.updatePasswordForm.value.password);
        let new_password = md5(this.updatePasswordForm.value.new_password);

        this.userService.getUser()
            .subscribe(result => {
                old_password = result.password;

                if(old_password === password)
                {
                    this.user.password = new_password;

                    this.userService.updateUser(this.user)
                        .subscribe(result => {
                            alert(result);
                        });
                }
                else alert('Mot de passe actuel incorrect.');
            });
    }

    /**
     * Suppréssion d'un utilisateur.
     */
    deleteUser() {

        this.userService.deleteUser()
            .subscribe(result => {
                alert(result);
                this.user = null;
                localStorage.removeItem('currentUser');
                this.router.navigate(['/']);
            });

    }

    /**
     * MAJ d'un utilisateur.
     */
    updateUser() {
        this.user = this.updateUserForm.value;

        this.userService.updateUser(this.user)
            .subscribe(result => {
                alert(result);
            });
    }

    /**
     * MAJ ou création d'une voiture.
     */
    updateOrCreateCar() {
        if(this.user.id_car !== null)
        {
            this.car = this.updateOrCreateCarForm.value;
            console.log('Update car :', this.car);

            this.carService.updateCar(this.car)
                .subscribe(result => {
                    alert(result);
                });
        } else {
            this.car = this.updateOrCreateCarForm.value;
            console.log('Create car :', this.car);

            this.carService.createCar(this.car, this.user)
                .subscribe(result => {
                    alert(result);
                    window.location.reload(true);
                });
        }

    }

    /**
     * Suppréssion d'une voiture.
     */
    deleteCar() {

        this.carService.deleteCar(this.car)
            .subscribe(result => {
                alert(result);
                window.location.reload(true);
            });
    }

    /**
     * Modification de la variable is_driver
     * @param $event
     */
    changeIsDriver($event): void {
        this.is_driver = JSON.parse($event.value);
    }

    /**
     * Modification de la variable have_car
     * @param $event
     */
    changeHaveCar($event): void {
        this.have_car = JSON.parse($event.value);
    }

    /**
     * Vérification de la voiture.
     * @returns {boolean}
     */
    checkCar(): boolean {
        return this.car.id_car != null;
    }
}
