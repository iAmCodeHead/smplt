import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoneymatterService {

  httpOptions = {
    headers: new HttpHeaders({

    })
};

  user: any;
  //  apiUrl = 'http://simplelotto.ng:8080';
  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  verifyDeposit(data, reference) {
    return this.http.post<any>(`${this.apiUrl}/users/deposit/${reference}`, data);
  }

  createPayout(data) {
    return this.http.post(`${this.apiUrl}/transfer/newRecipient`, data);
  }

  transferDetails(data) {
    return this.http.post(`${this.apiUrl}/transfer/transferRecipient`, data);
  }

  cashOUt(data) {
    return this.http.post(`${this.apiUrl}/transfer/cashOut`, data);
  }
}
