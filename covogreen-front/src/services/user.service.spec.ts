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
import {Car} from "../class/car";

describe('UserService', () => {

    let component: UserService;
    let uri: string;
    let users: Array<User>;
    let user: User;
    let car: Car;

    beforeEach(async(() => {

        uri = "http://localhost:1313/user";

        user = new User(
            null,
            "Valjean",
            "Jean",
            "test",
            "test@test.fr",
            "098f6bcd4621d373cade4e832627b4f6",
            "10, Avenue Massena",
            "Nice",
            "06000",
            "0658741147",
            false
        );

        car = new Car(
            null,
            "77-99-88-77",
            "Renault",
            "Twingo",
            5
        );

        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                { provide: uri, useValue: uri },
                component,
                { provide: XHRBackend, useClass: MockBackend },
            ]
        });

        users = [user];

    }));

    describe('createUser()', () => {


        it('should return an Observable<string> for user without car', () => {

            inject([component, XHRBackend], (componentService, mockBackend) => {

                const mockResponse = {status: 200};

                mockBackend.connections
                    .subscribe((connection) => {
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

    describe('getUsers()', () => {

        it('should return an Observable<Array<User>>', () => {

            inject([component, XHRBackend], (componentService, mockBackend) => {

                const mockResponse = users;

                mockBackend.connections.subscribe((connection) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockResponse)
                    })));
                });

                componentService.getUsers().subscribe((response: Array<User>) => {
                    expect(response).toEqual(users);
                });

            });

        });

    });

    describe('deleteUser()', () => {

        it('should return an Observable<string>', () => {

            inject([component, XHRBackend], (componentService, mockBackend) => {

                const mockResponse = {status: 200};

                mockBackend.connections.subscribe((connection) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockResponse)
                    })));
                });

                componentService.delete().subscribe((response: string) => {
                    expect(JSON.parse(response).status).toEqual(200);
                });

            });

        });

    });

    describe('updateUser()', () => {

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

    });
});
