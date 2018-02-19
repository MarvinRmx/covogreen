// https://blog.thoughtram.io/angular/2016/11/28/testing-services-with-http-in-angular-2.html

import {} from 'jasmine';
import { TestBed, async, inject } from '@angular/core/testing';
import {
    HttpModule,
    Http,
    Response,
    ResponseOptions,
    XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { UserService } from './user.service';
import {Observable} from "rxjs/Observable";
import {User} from "../class/user";
import {AuthentificationService} from "./authentification.service";

describe('AuthentificationService', () => {

    let component: AuthentificationService;
    let uri: String = "http://localhost:1313/";

    let identifiants = {
        password: "test",
        username: "test",
    };

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                { provide: uri, useValue: uri },
                component,
                { provide: XHRBackend, useClass: MockBackend },
            ]
        });

    }));


    describe('login()', () => {

        it('should return an Observable<boolean>', () => {

            inject([component, XHRBackend], (componentService, mockBackend) => {

                const mockResponse = {status: 200};

                mockBackend.connections.subscribe((connection) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockResponse)
                    })));
                });

                componentService.login().subscribe((response: string) => {
                    expect(JSON.parse(response).status).toEqual(200);
                });

            });

        });


    });


});
