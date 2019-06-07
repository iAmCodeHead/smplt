import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICoupon } from './coupon';
import { Observable } from 'rxjs';
import { Headers } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  userFromStorage: any;
  authToken: any;
  user: any;


    httpOptions = {
      headers: new HttpHeaders({

      })
  };

  /**
   * The PRIVATE class below gets the url of the data.
   */
  //  private _url = 'http://simplelotto.ng:8080';

   private _url = 'http://localhost:3000';

  newTicket(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post<any>(`${this._url}/games/newticket`, data, this.httpOptions);
  }

  newTransaction(transactionData) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post<any>(`${this._url}/games/newticket`, transactionData, this.httpOptions);
  }

  getWinningTickets(): Observable<ICoupon[]> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get<ICoupon[]>(`${this._url}/games/winning-tickets`, this.httpOptions);
  }

  loadUser() {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    this.userFromStorage = userInfo;
    // console.log(this.userFromStorage);
    return this.userFromStorage;
  }

  updateAcct(data): Observable<ICoupon> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.patch<ICoupon>(`${this._url}/users/updateAcct`, data, this.httpOptions);
  }

  fetchCategories() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this._url}/categories/`, this.httpOptions);
  }

  constructor(private http: HttpClient) { }
}
