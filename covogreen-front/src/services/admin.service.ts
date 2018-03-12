import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {User} from "../class/user";
import {AuthRequest} from "./authrequest.service";

@Injectable()
export class AdminService {

    private uri: string;

    constructor(
        private http: Http,
        private authRequest: AuthRequest
    ) {
        this.uri = "http://localhost:1313/";
    }

    handleRevoked(user: User): Observable<string> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.uri + 'user/revoked', JSON.stringify(user), this.authRequest.requestOptions)
            .map((response: Response) => {
                return response.text();
            });
    }

    handlePrivilege(user: User): Observable<string> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.uri + 'user/privilege', JSON.stringify(user), this.authRequest.requestOptions)
            .map((response: Response) => {
                return response.text();
            });
    }
}

