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
import {MatCardModule} from '@angular/material/card';

import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
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
import { AuthRequest } from '../services/authrequest.service';

import { UserComponent } from './user/user.component';
import { NewuserComponent } from './user/newuser.component';

import { AdminComponent } from './admin/admin.component';
import { RechercheFormComponent } from './recherche-form/recherche-form.component';
import { RecherchePageComponent } from './recherche-page/recherche-page.component';

import { NewCarComponent } from './car/newcar.component';
import {CreateJourneyComponent} from './journey/create-journey/create-journey.component';

import { ChatComponent } from './detailed-card/chat/chat.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { MyJourneysComponent } from './journey/my-journeys/my-journeys.component';
import {JourneyService} from '../services/journey.service';
import { DetailedCardComponent } from './detailed-card/detailed-card.component';
import { RateComponent } from './detailed-card/rate/rate.component';
import { BoutonInscriptionComponent } from './bouton-inscription/bouton-inscription.component';

import {SafePipe} from '../directives/safepipe.directive';

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
        MatCardModule,
        NgxSmartModalModule.forRoot(),
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
        AdminUsersComponent,
        MyJourneysComponent,
        DetailedCardComponent,
        RateComponent,
        SafePipe,
        BoutonInscriptionComponent
    ],
    providers: [
        AuthentificationService,
        GuardService,
        GuardAdminService,
        UserService,
        CarService,
        AdminService,
        AuthRequest,
        JourneyService,
        NgxSmartModalService,
        {
            provide: MATERIAL_SANITY_CHECKS,
            useValue: false
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
