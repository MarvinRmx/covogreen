import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatPaginator} from '@angular/material';
import {User} from '../../../class/user';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit, AfterViewInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    public displayedColumns = ['id_user', 'username', 'privilege', 'revoked', 'update'];
    public dataSource = new MatTableDataSource<User>([]);

    constructor(
        private userService: UserService,
    ) { }

    /*ngOnInit() {
        this.userService.getUsers()
            .subscribe( result => {
                this.dataSource = new MatTableDataSource<User>(result);
                this.dataSource.paginator = this.paginator;
            });
    }*/

    ngOnInit() {
        this.userService.getUsers()
            .subscribe( result => {
                this.dataSource = new MatTableDataSource<User>(result);
                this.dataSource.paginator = this.paginator;
            });
    }

    ngAfterViewInit() {}

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

}
