import { Component, OnInit } from '@angular/core';
import {MyTicketsService} from '../services/my-tickets.service';
import {AuthService} from '../services/auth.service';
import { interval } from 'rxjs';
import { CountdownService } from '../services/countdown.service';
import {FilterPipe} from '../filter.pipe';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-winning-tickets',
  templateUrl: './winning-tickets.component.html',
  styleUrls: ['./winning-tickets.component.css'],
  providers: [FilterPipe]
})
export class WinningTicketsComponent implements OnInit {

  user: any;
  term: any;
  secondsCounter = interval(500);
  public winningTickets: any;
  public winners: any;
  recent25kWinningTickets: any;
  recent50kWinningTickets: any;
  recent100kWinningTickets: any;
  arr: any;
  status: any;
  signalStatus = this._countdown.signalStatus;
  count: any;
  public loading = false;
  menu1Signal = true;
  menu2Signal = false;
  menu3Signal = false;

  constructor(private winning_tickets: MyTicketsService,
     private auth: AuthService,
     private spinnerService: Ng4LoadingSpinnerService,
     private _countdown: CountdownService) {
    //   this.winning_tickets.getWinningTickets()
    //   .subscribe(res => {this.winningTickets = res;
    // }, error => {
    //     console.log(`The shuffling is not working at the moment: ${error}`);
    //     console.log(error);
    //   });
      }

  currentDate = this._countdown.currentDate;
  currentDay = this._countdown.currentDay;
  day = this._countdown.day;
  month = this._countdown.month;
  year = this._countdown.year;

  today = this.year + '-' + this.month + '-' + this.day;
  now = Date.now();
  newCount = this.today + ' 18:00:00';

  tomorrowday: number = this._countdown.tomorrowday;
  tomorrowmonth = this._countdown.tomorrowmonth;
  tomorrowyear = this._countdown.tomorrowyear;
  another_tomorrow = this.tomorrowyear + '-' + this.tomorrowmonth + '-' + this.tomorrowday;


  afterCountDown() {
    this.signalStatus = true;
    this.newCount = this.another_tomorrow + ' 18:00:00';
  }

  menu1() {
    this.menu1Signal = true;
    this.menu2Signal = false;
    this.menu3Signal = false;
  }

  menu2() {
    this.menu1Signal = false;
    this.menu2Signal = true;
    this.menu3Signal = false;
  }
  menu3() {
    this.menu1Signal = false;
    this.menu2Signal = false;
    this.menu3Signal = true;
  }

  ngOnInit() {

    this.loading = true;

    this.winning_tickets.getPast25kWinners()
    .subscribe(res => {this.recent25kWinningTickets = res;
      this.loading = false;
    });
    this.winning_tickets.getPast50kWinners()
    .subscribe(res => {this.recent50kWinningTickets = res;
      this.loading = false;
    });
    this.winning_tickets.getPast100kWinners()
    .subscribe(res => {this.recent100kWinningTickets = res;
      this.loading = false;
    });
    this.auth.getProfile().subscribe(profile => {
      this.user = profile.user;
    }, error => {
      return false;
    });

    }

}
