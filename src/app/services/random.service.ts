import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RandomService {
  private msgSource = new BehaviorSubject<any>({});
  telecast = this.msgSource.asObservable();
  private bonusSource = new BehaviorSubject<any>({});
  anotherTeleCast = this.bonusSource.asObservable();
  private loggedInStatus = new BehaviorSubject<any>(this.authService.loggedIn());
  status = this.loggedInStatus.asObservable();
  private nxtGameid = new BehaviorSubject<any>({});
  nextGameId = this.nxtGameid.asObservable();

  constructor( private authService: AuthService) { }

  editmsg(newMsg) {
    this.msgSource.next(newMsg);
  }

  editBonus(newBouns) {
    this.bonusSource.next(newBouns);
  }

  loginStatus(statusSignal) {
    this.loggedInStatus.next(statusSignal);
  }

  gameId(id) {
    this.nxtGameid.next(id);
  }
}
