import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../class/user';
import { Router } from '@angular/router';

//import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import * as md5 from 'md5';
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
            phone: ""
        });

        this.userService.getUser()
            .subscribe(result => {
                this.user = result;
                this.updateUserForm = this.formBulder.group(this.user);
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
}
