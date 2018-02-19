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
import {Car} from "../class/car"

describe('UserService', () => {

    let component: UserService;
    let uri: String = "http://localhost:1313/user";

    let userData = {
        address: "10, Avenue Massena",
        city: "Nice",
        cp: "06000",
        email: "test@test.fr",
        firstName: "Jean",
        is_driver: true,
        lastName: "Valjean",
        password: "098f6bcd4621d373cade4e832627b4f6",
        phone: "0600000000",
        username: "test",
        have_car: true,
        id_user: 1,
        id_car: 1,
        privilege: 1
    };
    let user: User = userData;

    let car: Car = {
        capacity: 3,
        licencePlate: "77-88-88",
        make: "Renault",
        model: "Twingo",
        id_car: 1
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

    describe('createUser()', () => {

        it('should return an Observable<string> for user without car', () => {

            inject([component, XHRBackend], (componentService, mockBackend) => {

                const mockResponse = {status: 200};

                mockBackend.connections.subscribe((connection) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockResponse)
                    })));
                });

                componentService.createUser(user, null).subscribe((response: string) => {
                    expect(JSON.parse(response).status).toEqual(200);
                });

            });

        });

        it('should return an Observable<string> for user with car', () => {

            inject([component, XHRBackend], (componentService, mockBackend) => {

                const mockResponse = {status: 200};

                mockBackend.connections.subscribe((connection) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockResponse)
                    })));
                });

                componentService.createUser(user, car).subscribe((response: string) => {
                    expect(JSON.parse(response).status).toEqual(200);
                });

            });

        });

    });

    /*describe('updateUser()', () => {

        it('should return an Observable<string>', () => {

            inject([component, XHRBackend], (componentService, mockBackend) => {

                const mockResponse = {status: 200};

                mockBackend.connections.subscribe((connection) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockResponse)
                    })));
                });

                componentService.updateUser(user).subscribe((response: string) => {
                    expect(JSON.parse(response).status).toEqual(200);
                });

            });

        });

    });*/

    /*describe('deleteUser()', () => {

        it('should return an Observable<string>', () => {

            inject([component, XHRBackend], (componentService, mockBackend) => {

                const mockResponse = {status: 200};

                mockBackend.connections.subscribe((connection) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockResponse)
                    })));
                });

                componentService.deleteUser(user).subscribe((response: string) => {
                    expect(JSON.parse(response).status).toEqual(200);
                });

            });

        });

    });*/

    describe('getUser()', () => {

        it('should return an Observable<User>', () => {

            inject([component, XHRBackend], (componentService, mockBackend) => {

                const mockResponse = user;

                mockBackend.connections.subscribe((connection) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockResponse)
                    })));
                });

                componentService.getUser().subscribe((response: User) => {
                    expect(response).toEqual(user);
                });

            });

        });

    });

    /*describe('updatePassword()', () => {

        it('should return an Observable<User>', () => {

            inject([component, XHRBackend], (componentService, mockBackend) => {

                const mockResponse = {status: 200};

                mockBackend.connections.subscribe((connection) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockResponse)
                    })));
                });

                componentService.updatePassword(user).subscribe((response: string) => {
                    expect(JSON.parse(response).status).toEqual(200);
                });

            });

        });

    });*/

});
