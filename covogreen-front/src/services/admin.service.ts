import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IOption } from 'ng-select';
import { Category } from '../class/category';
import { Product } from '../class/product';
import { User } from '../class/user';

@Injectable()
export class AdminService {

    private uri: string;

    constructor(
        private http: Http
    )
    {
		this.uri = "http://localhost:3000/";
    }

    // 27-02-18
    // Ajout DELETE USER

    deleteUser(user : User) : Observable<string> {
        let headers = new Headers({"Content-Type": "application/json"});
        let options = new RequestOptions({headers: headers});

        return this.http.post(this.uri + "admin/user/delete", JSON.stringify(user), options)
            .map((response: Response) => {
                console.log(response.text());
                return response.text();
            })
    }

    createCategory(category: Category): Observable<string> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.uri + "admin/category/create", JSON.stringify(category), options)
            .map((response: Response) => {
                console.log(response.text());
                return response.text();
            });
    }

    createProduct(product: Product): Observable<string> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.uri + "admin/product/create", JSON.stringify(product), options)
            .map((response: Response) => {
                console.log(response.text());
                return response.text();
            });
    }

    getCategories(): Observable<Array<Category>> {

        let user = localStorage.getItem('currentUser');
        return this.http.get(this.uri + "admin/category/all")
            .map((response: Response) => {
                let result = response.text();
                return JSON.parse(result);
            });
    }

    getProducts(): Observable<Array<Product>> {

        let user = localStorage.getItem('currentUser');
        return this.http.get(this.uri + "admin/product/all")
            .map((response: Response) => {
                let result = response.text();
                return JSON.parse(result);
            });
    }

    getProduct(product: Product): Observable<Product> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.uri + "admin/product/get", product, options)
            .map((response: Response) => {
                let result = response.text();
                return JSON.parse(result);
            });
    }

    updateCategory(category: Category): Observable<string> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.uri + "admin/category", JSON.stringify(category), options)
            .map((response: Response) => {
                console.log(response.text());
                return response.text();
            });
    }

    updateProduct(product: Product): Observable<string> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.uri + "admin/product", JSON.stringify(product), options)
            .map((response: Response) => {
                console.log(response.text());
                return response.text();
            });
    }

    deleteCategory(category: Category): Observable<string> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.uri + "admin/category/delete", JSON.stringify(category), options)
            .map((response: Response) => {
                console.log(response.text());
                return response.text();
            });
    }

    deleteProduct(product: Product): Observable<string> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.uri + "admin/product/delete", JSON.stringify(product), options)
            .map((response: Response) => {
                console.log(response.text());
                return response.text();
            });
    }
}

