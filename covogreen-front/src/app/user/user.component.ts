/*
 * https://www.concretepage.com/angular-2/angular-2-formcontrol-example
 */

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, Validator } from '@angular/forms';
import { TextEqualityValidatorModule } from 'ngx-text-equality-validator';
import { UserService } from '../../services/user.service';
import { User } from '../../class/user';
import { Router } from '@angular/router';

import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  providers: [UserService]

})
export class UserComponent implements OnInit {


    public user: User;

    public id: number;
    public username: string;
    public password: string;
    public email: string;
    public lastname: string;
    public firstname: string;
    public city: string;
    public street: string;
    public cp: string;
    public country: string;

    public username_ctrl: FormControl;
    public email_ctrl: FormControl;
    public firstname_ctrl: FormControl;
    public lastname_ctrl: FormControl;
    public city_ctrl: FormControl;
    public street_ctrl: FormControl;
    public cp_ctrl: FormControl;
    public country_ctrl: FormControl;
    public updateUserForm: FormGroup;

    public oldPassword_ctrl: FormControl;
    public newPassword_ctrl: FormControl;
    public confirmPassword_ctrl: FormControl;
    public updatePasswordForm: FormGroup;

    constructor(
        private router: Router,
        private formBulder: FormBuilder,
        private userService: UserService

    ) {
        let token = localStorage.getItem('currentUser');
        this.user = JSON.parse(token);
    }

    ngOnInit() {

        this.username = this.user.username;
        this.email = this.user.email;
        this.firstname = this.user.firstName;
        this.lastname = this.user.lastName;
        this.city = this.user.city;
        this.street = this.user.address;
        this.cp = this.user.cp;

        this.username_ctrl = this.formBulder.control(this.user.username);
        this.email_ctrl = this.formBulder.control(this.user.email);
        this.firstname_ctrl = this.formBulder.control(this.user.firstName);
        this.lastname_ctrl = this.formBulder.control(this.user.lastName);
        this.city_ctrl = this.formBulder.control(this.user.city);
        this.street_ctrl = this.formBulder.control(this.user.address);
        this.cp_ctrl = this.formBulder.control(this.user.cp);
        this.country_ctrl = this.formBulder.control(this.user.city);

        this.updateUserForm = this.formBulder.group({
            username: this.username_ctrl,
            email: this.email_ctrl,
            lastname: this.lastname_ctrl,
            firstname: this.firstname_ctrl,
            city: this.city_ctrl,
            street: this.street_ctrl,
            cp: this.cp_ctrl,
            country: this.country_ctrl
        });

        this.oldPassword_ctrl = this.formBulder.control('');
        this.newPassword_ctrl = this.formBulder.control('');
        this.confirmPassword_ctrl = this.formBulder.control('');

        this.updatePasswordForm = this.formBulder.group({
            username: this.user.username,
            old_password: this.oldPassword_ctrl,
            new_password: this.newPassword_ctrl,
            confirm_password: this.confirmPassword_ctrl
        });
    }

    updateUser() {

        /*this.userService.updateUser(this.updateUserForm.value)
            .subscribe(result => {
                alert(result);

                this.userService.getUser()
                    .subscribe(result => {
                        localStorage.setItem('currentUser', JSON.stringify(result));
                        let tokenUser = localStorage.getItem('currentUser');
                        this.user = JSON.parse(tokenUser);
                        this.router.navigate(['/user']);
                    });
            });*/
    }

    updatePassword() {
        console.log(this.updatePasswordForm.value);

        /*this.userService.updatePassword(this.updatePasswordForm.value)
            .subscribe(result => {
                alert(result);
            });*/

    }

    deleteUser() {
        /*this.userService.deleteUser(this.user)
            .subscribe(result => {
                alert(result);
                localStorage.removeItem('currentUser');
                this.router.navigate(['/']);
            });*/
    }
}
