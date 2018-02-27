import { Component, OnInit, Input, OnChanges  } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { UserService} from "../../services/user.service";
import { User} from "../../class/user";

@Component({
  selector: 'app-admin-user-detail',
  templateUrl: './admin-user-detail.component.html',
  styleUrls: ['./admin-user-detail.component.css']
})
export class AdminUserDetailComponent implements OnChanges {
@Input() user: User;

userForm: FormGroup;
nameChangeLog: string[] = [];


  constructor(
      private fb : FormBuilder,
      private userService : UserService) {

      this.createForm();
      this.logNameChange(); }


  createForm() {
      this.userForm = this.fb.group({
          lastName: '',
          firstName : '',
          username: this.fb.array([])

      });
  }
ngOnChanges(){
      this.userForm.reset({
          lastname: this.user.lastName

      });

}

get username() : FormArray {
      return this.userForm.get('username') as FormArray;

};

  onSubmit() {
      this.user = this.prepareSaveUser();
      this.userService.updateUser(this.user).subscribe()
      this.ngOnChanges();

  }

  prepareSaveUser(): User {
      const formModel = this.userForm.value;
      const usernamecopy: User[] = formModel.username.map(
          (user: User) => Object.assign({}, user));

      const saveUser: User = {

          email : this.user.email,
          city : this.user.city,
          privilege : this.user.privilege,
          cp : this.user.cp,
          phone : this.user.phone,
          is_driver : this.user.is_driver,
          id_car : this.user.id_car,
          password : this.user.password,
          address : this.user.address,
          id_user: this.user.id_user,
          lastName: this.user.lastName,
          firstName: this.user.firstName,
          username: formModel.username as string // test sur le renvoi > (tableau / string ?)
      };
      return saveUser;
  }

  revert() {this.ngOnChanges();}
  logNameChange(){
      const nameControl = this.userForm.get('username');
      nameControl.valueChanges.forEach((value:string) => this.nameChangeLog.push(value));
  }




  /*addUsername(){
      this.username.push(this.fb.group(new User()));
  }*/
/*
  ngOnInit() {
  }
*/

}
