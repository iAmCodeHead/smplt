import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Headers } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable({
    providedIn: 'root'
})
export class AuthService {



    authToken: any;
    user: any;


    httpOptions = {
        headers: new HttpHeaders({

        })
    };



    // apiUrl = 'http://simplelotto.ng:8080/users';
    // adminAPI = 'http://simplelotto.ng:8080';

    apiUrl = 'http://localhost:3000/users';
    adminAPI = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    authenticateUser(data) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        // console.log(data);
        return this.http.post<any>(`${this.apiUrl}/authenticate`, data, this.httpOptions);
    }
    authenticateUserWithPhoneNumber(data) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        // console.log(data);
        return this.http.post<any>(`${this.apiUrl}/authenticateWithPhoneNumber`, data, this.httpOptions);
    }

    resetUser(data) {
        return this.http.post<any>(`${this.apiUrl}/reset`, data, this.httpOptions);
    }

    resetUserWithPhoneNumber(data) {
        return this.http.post<any>(`${this.apiUrl}/resetWithSms`, data, this.httpOptions);
    }

    updateUser(data) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        // console.log(data);
        return this.http.patch<any>(`${this.apiUrl}/updateUserProfile`, data, this.httpOptions);
    }

    getProfile() {
        this.loadToken();
        const headers = { 'Authorization': this.authToken };
        return this.http.get<any>(`${this.apiUrl}/profile`, { headers });
    }

    storeUserData(token) {
        localStorage.setItem('id_token', token);
        this.authToken = token;
    }

    storeUserWithoutToken(user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.user = user;
    }

    loadToken() {
        const token = localStorage.getItem('id_token');
        this.authToken = token;
    }


    loggedIn() {
       return tokenNotExpired('id_token');
    }

    logout() {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    }



}
