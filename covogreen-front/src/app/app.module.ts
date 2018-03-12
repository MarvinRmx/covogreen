import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, AfterViewInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, Http, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import {
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MATERIAL_SANITY_CHECKS,
    MatSliderModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSlideToggleModule
} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { SelectModule } from 'ng-select';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';

import {AuthentificationService} from '../services/authentification.service';
import {GuardService} from '../services/guard.service';
import {GuardAdminService} from '../services/guard-admin.service';
import {UserService} from '../services/user.service';
import {CarService} from '../services/car.service';
import {AdminService} from '../services/admin.service';
import { RechercheTrajetService } from '../services/recherche-trajet.service';

import { UserComponent } from './user/user.component';
import { NewuserComponent } from './user/newuser.component';

import { AdminComponent } from './admin/admin.component';
import { RechercheFormComponent } from './recherche-form/recherche-form.component';
import { RecherchePageComponent } from './recherche-page/recherche-page.component';

import { NewCarComponent } from './car/newcar.component';
import {CreateJourneyComponent} from './journey/create-journey/create-journey.component';

import { ChatComponent } from './chat/chat.component';
import { TestComponent } from './test/test.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';


@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        SelectModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatRadioModule,
        MatSliderModule,
        MatFormFieldModule,
        MatTableModule,
        MatInputModule,
        MatPaginatorModule,
        MatSlideToggleModule,
        MatTabsModule,
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'danger' // set defaults here
        })
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        UserComponent,
        NewuserComponent,
        AdminComponent,
        NewCarComponent,
        CreateJourneyComponent,
        RechercheFormComponent,
        RecherchePageComponent,
        NewCarComponent,
        ChatComponent,
        TestComponent,
        AdminUsersComponent
    ],
    providers: [
        AuthentificationService,
        GuardService,
        GuardAdminService,
        UserService,
        CarService,
        AdminService,
        {
            provide: MATERIAL_SANITY_CHECKS,
            useValue: false
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
