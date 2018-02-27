import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import {User} from "../../class/user";
import {UserService} from "../../services/user.service";
// import {AdminService} from "../../services/admin.service";

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

    user : Observable<User>;
    isLoading  = false;
    selectedUser : User;

  constructor(private userService : UserService) { }

  ngOnInit() {this.getUser();}

  getUser() {
      this.isLoading = true;
      this.user = this.userService.getUser()
          .finally(() => this.isLoading = false);
      this.selectedUser = undefined;
  }

  select(user : User){
      this.selectedUser = user;
  }
}
