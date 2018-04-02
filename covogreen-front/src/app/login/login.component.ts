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
 */
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [AuthentificationService]
})

export class LoginComponent implements OnInit {

    public user: User;
    public loginForm: FormGroup;

	constructor(
		private router: Router,
        private appComponent: AppComponent,
        private authenticationService: AuthentificationService,
        private formBulder: FormBuilder,
        private authRequest: AuthRequest
	) { }

	ngOnInit() {
        this.loginForm = this.formBulder.group({
            username: '',
            password: ''
        });
    }

    /**
     * Method for accept or refuse connexion for users.
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
     * Method for checking the protected pages, reserved for authentified users.
     * @returns {boolean}
     */
    checkAuth(): boolean {
        let tokenUser = localStorage.getItem('currentUser');

        if (tokenUser !== null) return true;
        else return false;
    }
}
