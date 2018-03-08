import {Headers, Http, BaseRequestOptions, RequestOptions} from '@angular/http';

export class AuthRequest {

    public headerAuth: Headers;
    public requestOptions: RequestOptions;

    constructor() {
        this.setHeader();
    }

    setHeader () {
        const token = localStorage.getItem('currentUser');
        this.headerAuth = new Headers();
        this.headerAuth.append('Content-Type', 'application/json');
        this.headerAuth.append('Authorization', 'bearer ' + token);

        this.requestOptions = new RequestOptions({ headers: this.headerAuth });
    }
}
