import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { AuthentificationService } from '../../services/authentification.service';
import { User } from '../../class/user';
import * as md5 from 'md5';
import {AppComponent} from '../app.component';
import {AuthRequest} from '../../services/authrequest.service';

/**
 * @author Romain Lembo
 * Component permettant à un utilisateur de se connecter à l'application.
 */
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [AuthentificationService]
})

export class LoginComponent implements OnInit {

    /**
     * Objet User
     */
    public user: User;

    /**
     * Formulaire de connexion
     */
    public loginForm: FormGroup;

    constructor(
        private router: Router,
        private appComponent: AppComponent,
        private authenticationService: AuthentificationService,
        private formBulder: FormBuilder,
        private authRequest: AuthRequest
    ) { }

    /**
     * Inialisation du component
     */
    ngOnInit() {
        this.loginForm = this.formBulder.group({
            username: '',
            password: ''
        });
    }

    /**
     * Transmission de la pair username / mot de passe pour la connexion.
     */
    login() {
        this.user = this.loginForm.value;
        this.user.password = md5(this.user.password);

        this.authenticationService.login(this.user)
            .subscribe(
                result => {

                    if (result === 200) {

                        let tokenUser = localStorage.getItem('currentUser');
                        this.authRequest.setToken(tokenUser);
                        this.appComponent.setIsAdministrator();

                        this.router.navigate(['/']);
                    }
                    else if (result === 203) alert('Compte bloqué');
                },
                err => {
                    alert('Identifiant et/ou mot de passe non reconnu');
                    this.ngOnInit();
                }
            );
    }


    /**
     * Méthode pour vérifier si il y a eu authentification.
     * @returns {boolean}
     */
    checkAuth(): boolean {
        let tokenUser = localStorage.getItem('currentUser');

        if (tokenUser !== null) return true;
        else return false;
    }
}
