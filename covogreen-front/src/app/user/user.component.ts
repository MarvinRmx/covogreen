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

    private updateUserForm: FormGroup = new FormGroup({});
    private updatePasswordForm: FormGroup = new FormGroup({});

    constructor(
        private router: Router,
        private formBulder: FormBuilder,
        private userService: UserService
    ) {}

    ngOnInit() {

        this.updateUserForm = this.formBulder.group({
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            address: "",
            city: "",
            cp: "",
            phone: ""
        });

        this.userService.getUser()
            .subscribe(result => {
                this.user = result;
                this.updateUserForm = this.formBulder.group(this.user);
            });
    }

    updateUser() {
        this.userService.updateUser(this.updateUserForm.value)
            .subscribe(result => {
                alert(result);
            });
    }
}
