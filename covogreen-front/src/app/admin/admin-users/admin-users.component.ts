import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatPaginator} from '@angular/material';
import {User} from '../../../class/user';
import {UserService} from '../../../services/user.service';
import {AdminService} from "../../../services/admin.service";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit, AfterViewInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    public user: User = new User(null, null, null, null, null,  null,  null,  null,  null,  null,  null);
    public displayedColumns = ['id_user', 'username', 'privilege', 'revoked'];
    public dataSource = new MatTableDataSource<User>([]);

    constructor(
        private userService: UserService,
        private adminService: AdminService
    ) { }

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

    handlePrivilege($event){
        this.user.id_user = $event.source.id;

        if($event.checked) this.user.privilege = 2;
        else this.user.privilege = 1;

        this.adminService.handlePrivilege(this.user)
            .subscribe( result => {
                alert(result);
            });
    }

    handleRevoked($event){
        this.user.id_user = $event.source.id;
        this.user.revoked = $event.checked;

        this.adminService.handleRevoked(this.user)
            .subscribe( result => {
                alert(result);
            });
    }
}
