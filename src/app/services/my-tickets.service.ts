import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ITickets} from './my-tickets';
import { Headers } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class MyTicketsService {

  httpOptions = {
    headers: new HttpHeaders({

    })
};

  user: any;
  // private _url = './assets/data/my-tickets.json';

  //  apiUrl = 'http://simplelotto.ng:8080';
   apiUrl = 'http://localhost:3000';

   day = new Date().getDate();
   month = new Date().getMonth() + 1;
   year = new Date().getFullYear();
   shuffleDate = this.day + '-' + this.month + '-' + this.year;




  getMyTickets(data): Observable<ITickets[]> {

    // the this.http.get() recieves a url
    // for an API or file to fetch as an
    // argument
  //  const userData = localStorage.getItem('user');
  //   this.user = JSON.parse(userData);
     return this.http.post<ITickets[]>(`${this.apiUrl}/games/alltickets`, data);

  }

  getMyLast5Tickets(data): Observable<ITickets[]> {

    // the this.http.get() recieves a url
    // for an API or file to fetch as an
    // argument
   // const userData = localStorage.getItem('user');
   // this.user = JSON.parse(userData);
     return this.http.post<ITickets[]>(`${this.apiUrl}/games/last5tickets`, data);

  }

  getMyTransactions(data) {
     return this.http.post(`${this.apiUrl}/transactions/allTransactions`, data);

  }

  checkTransStatus(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
     return this.http.post(`${this.apiUrl}/transactions/checkTransaction`, data, this.httpOptions);

  }

  newTransactions(newData) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.apiUrl}/transactions/newTransaction`, newData, this.httpOptions);

  }

  updateSelectedTicket(ticket_id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.apiUrl}/games/updateSelectedTicket`, ticket_id, this.httpOptions);

  }

  getWinningTickets() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.apiUrl}/games/winning-tickets-signal/${this.shuffleDate}/won`, this.httpOptions);
  }

  submitWinningTickets(winningTicket) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.apiUrl}/winners/newWinningTicket`, winningTicket, this.httpOptions);

  }

  getPast25kWinners() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.apiUrl}/games/pastWinningTickets/won/25`, this.httpOptions);
  }

  getPast50kWinners() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.apiUrl}/games/pastWinningTickets/won/50`, this.httpOptions);
  }

  getPast100kWinners() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.apiUrl}/games/pastWinningTickets/won/100`, this.httpOptions);
  }

  payWinner(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.apiUrl}/users/payWinner`, data, this.httpOptions);

  }


  constructor(private http: HttpClient) { }
}
