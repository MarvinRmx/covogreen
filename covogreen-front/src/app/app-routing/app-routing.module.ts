/*
 * TUTO : http://jasonwatmore.com/post/2016/08/16/angular-2-jwt-authentication-example-tutorial
 */

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {GuardService} from '../../services/guard.service';
import {GuardAdminService} from '../../services/guard-admin.service';

import {HomeComponent} from '../home/home.component';
import {UserComponent} from '../user/user.component';
import {NewuserComponent} from '../user/newuser.component';

import {AdminComponent} from '../admin/admin.component';
import {CreateJourneyComponent} from '../journey/create-journey/create-journey.component';
import {MyJourneysComponent} from '../journey/my-journeys/my-journeys.component';

import {RecherchePageComponent} from '../recherche-page/recherche-page.component';
import {ChatComponent} from '../detailed-card/chat/chat.component';


const routes: Routes = [
    { path: '', component: HomeComponent},

    { path: 'newuser', component: NewuserComponent },

    { path: 'admin', component: AdminComponent, canActivate: [GuardAdminService] },

    { path: 'user', component: UserComponent, canActivate: [GuardService] },

    { path: 'journey/create', component: CreateJourneyComponent, canActivate: [GuardService] },
    { path: 'journey/my', component: MyJourneysComponent, canActivate: [GuardService] },
    { path: 'recherche', component: RecherchePageComponent },
    { path: 'chat/:id', component: ChatComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ],
    declarations: []
})
export class AppRoutingModule {}
