import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatPaginator} from '@angular/material';
import {User} from '../../../class/user';
import {UserService} from '../../../services/user.service';
import {AdminService} from '../../../services/admin.service';

/**
 * @author Romain Lembo
 * Component permettant aux administrateurs de gérer les comptes d'utilisateurs.
 */
@Component({
    selector: 'app-admin-users',
    templateUrl: './admin-users.component.html',
    styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit, AfterViewInit {

    /**
     * Paginigation du tableau.
     */
    @ViewChild(MatPaginator) paginator: MatPaginator;

    /**
     * Objet User
     * @type {User}
     */
    public user: User = new User(null, null, null, null, null,  null,  null,  null,  null,  null,  null, null);

    /**
     * Colonnes du tableau.
     * @type {string[]}
     */
    public displayedColumns = ['id_user', 'username', 'privilege', 'revoked'];

    /**
     * Données du tableau.
     * @type {MatTableDataSource<Journey>}
     */
    public dataSource = new MatTableDataSource<User>([]);

    constructor(
        private userService: UserService,
        private adminService: AdminService
    ) { }

    /**
     * Initialisation du component
     */
    ngOnInit() {
        this.userService.getUsers()
            .subscribe( result => {
                this.dataSource = new MatTableDataSource<User>(result);
                this.dataSource.paginator = this.paginator;
            });
    }

    /**
     * Raffraichissement du component.
     */
    ngAfterViewInit() {}

    /**
     * Filtre de recherche.
     * @param {string} filterValue
     */
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    /**
     * Modification de la propriété "privilege" d'un utilisateur.
     * @param $event
     */
    handlePrivilege($event){
        this.user.id_user = $event.source.id;

        if($event.checked) this.user.privilege = 2;
        else this.user.privilege = 1;

        this.adminService.handlePrivilege(this.user)
            .subscribe( result => {
                alert(result);
            });
    }

    /**
     * Modification de la propriété "revoked" d'un utilisateur.
     * @param $event
     */
    handleRevoked($event){
        this.user.id_user = $event.source.id;
        this.user.revoked = $event.checked;

        this.adminService.handleRevoked(this.user)
            .subscribe( result => {
                alert(result);
            });
    }
}
