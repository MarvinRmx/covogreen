import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * @author Romain Lembo
 * Component pour les formulaires de la voiture d'un utilisateur.
 */
@Component({
    selector: 'app-newcar',
    templateUrl: './newcar.component.html',
    styleUrls: ['./newcar.component.css']
})
export class NewCarComponent implements OnInit {

    /**
     * Formulaire pour la création d'une voiture.
     */
    public createCarForm: FormGroup;

    constructor(
        private formBulder: FormBuilder
    ) { }

    /**
     * Inialisation du component
     */
    ngOnInit() {

        this.createCarForm = this.formBulder.group({
            brand: this.formBulder.control('', Validators.required),
        });

    }

}
