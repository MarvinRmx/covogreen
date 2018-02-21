import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../class/user';
import { Router } from '@angular/router';

//import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { EqualTextValidator } from "angular2-text-equality-validator";
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
            confirm_password: [null, [this.passwordConfirming]]
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

    passwordConfirming(c: AbstractControl): any {
        if(!c.parent || !c) return;
        const pwd = c.parent.get('password');
        const cpwd= c.parent.get('confirm_password')

        if(!pwd || !cpwd) return ;
        if (pwd.value !== cpwd.value) {
            return { invalid: true };

        }
    }

    updateUser() {
        this.userService.updateUser(this.updateUserForm.value)
            .subscribe(result => {
                alert(result);
            });
    }

    // A VOIR : https://github.com/AngularClass/match-control
    updatePassword() {
        this.user.password = md5(this.updatePasswordForm.value.new_password);

        this.userService.updateUser(this.user)
            .subscribe(result => {
                alert(result);
            });
    }
}
