import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {User} from "../../../class/user";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

    constructor(private userService: UserService) { }

    dataSource = new UserDataSource(this.userService);
    displayedColumns = ['name', 'email', 'phone', 'company'];

    ngOnInit() {}
}

// ---------------------- //

export class UserDataSource extends DataSource<any> {

    constructor(private userService: any) {
        super();
    }

    connect(): Observable<Array<User>> {
        return this.userService.getUser();
    }

    disconnect() {}
}
