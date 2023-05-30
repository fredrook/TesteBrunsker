import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export abstract class DataService {
    constructor(protected http: HttpClient) {
    }

    protected get<T>(url?: string, ): Observable<T> {
        return this.http
            .get<T>(url);
    }

    protected post<T>(url: string, data: any): Observable<T> {
        return this.http
            .post<T>(url, data);
    }

    protected put<T>(url: string, data: any): Observable<T> {
        return this.http
            .put<T>(url, data);

    }

    protected delete<T>(url?: string): Observable<T> {
        return this.http
            .delete<T>(url);
    }

    protected postReport<T>(url: string, data: any): Observable<T> {

        var currentUser = JSON.parse(localStorage.getItem('currentUser'));

        const config = {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('apptoken'),
                'Accept': 'application/pdf'
        },
        responseType: 'text' as 'json'
        } 
        
        return this.http
        .post<T>(url, data, config);
    }
    
}