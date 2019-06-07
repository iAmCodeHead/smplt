import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {


  // apiUrl = 'http://simplelotto.ng:8080/users';

  apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  registerUser(data) {
   // console.log(data);
    return this.http.post<any>(`${this.apiUrl}/register`, data);
  }


}
