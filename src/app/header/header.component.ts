import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { CountdownService } from '../services/countdown.service';
import {MyTicketsService} from '../services/my-tickets.service';
import { RandomService } from '../services/random.service';
import * as moment from 'moment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() newRandMsg: string;

  navigationSubscription;
  loggedInStatus: any;
  user_id;
  public my_countdown = [];
  signalStatus = this._countdown.signalStatus;
  currentDate = this._countdown.currentDate;
  currentDay = this._countdown.currentDay;
  day = this._countdown.day;
  month = this._countdown.month;
  year = this._countdown.year;
  user: any;
  today = this.year + '-' + this.month + '-' + this.day;
  now = Date.now();
  newCount = this.today + ' 17:45:00';
  message: any;
  editedMsg: any;
  user_main_balance;
  user_bonus;
  id: any;
  nearestDrawId;
  tommorrow = moment().add(1, 'days');
  oldate = moment();
  formattedToday = this.oldate.format('dddd');
  formattedTomorrow = this.tommorrow.format('dddd');
  date = this.signalStatus ? this.formattedTomorrow : this.formattedToday;

  constructor(private authService: AuthService,
              private router: Router,
              private winning_tickets: MyTicketsService,
              private _flashMessagesService: FlashMessagesService,
              private someServ: RandomService,
              private _countdown: CountdownService) {


                this.someServ.status.subscribe(sts => this.loggedInStatus = sts);
                this.authService.getProfile()
                .subscribe( profile => {
                  this.user = {
                    main_balance: profile.user.main_balance,
                    username: profile.user.username,
                    bonus: profile.user.bonus
                  };
                  this.someServ.editmsg(this.user.main_balance);
                  this.someServ.editBonus(this.user.bonus);
                });
                this.someServ.loginStatus(this.loggedInStatus);
                this.someServ.status.subscribe(status => this.loggedInStatus = status);
                // if (this.firstDraw < this.secondDraw && this.firstDraw < this.thirdDraw) {
                //   this.nearestDrawId = '1';
                // }  else if (this.secondDraw < this.firstDraw && this.secondDraw < this.thirdDraw) {
                //   this.nearestDrawId = '3';
                // } else  {
                //   this.nearestDrawId = '5';
                // }
                const newfirstDraw = this.drawTimer(1, 'DD');
                const newsecondDraw = this.drawTimer(3, 'DD');
                const newthirdDraw = this.drawTimer(5, 'DD');
                if (newfirstDraw < newsecondDraw && newfirstDraw < newthirdDraw) {
                  this.nearestDrawId = '1';
                }  else if (newsecondDraw < newfirstDraw && newsecondDraw < newthirdDraw) {
                  this.nearestDrawId = '3';
                } else  {
                  this.nearestDrawId = '5';
                }
               }

               firstDraw = this.drawTimer(1, 'dddd, MMMM Do');
               secondDraw = this.drawTimer(3, 'dddd, MMMM Do');
               thirdDraw = this.drawTimer(5, 'dddd, MMMM Do');

              afterCountDown() {
                this.signalStatus = true;
                this.countdownDetector(res => {
                  this.newCount = res.draw_date + ' 18:00:00';
                  this.date = res.draw_date;
                });
              }

              drawTimer(dayINeed, formatTpye) {
                const today = moment().isoWeekday();
                if (today <= dayINeed) {
                  return (moment().isoWeekday(dayINeed).format(formatTpye));
                } else {
                  return (moment().add(1, 'weeks').isoWeekday(dayINeed).format(formatTpye));
                }
              }

              countdownDetector(callback) {
                const firstDrawDay = this.drawTimer(parseInt(this.id, 10), 'D');
                const firstDrawMonth = this.drawTimer(parseInt(this.id, 10), 'M');
                const firstDrawYear = this.drawTimer(parseInt(this.id, 10), 'Y');
                return callback({
                  draw_date : `${firstDrawYear}-${firstDrawMonth}-${firstDrawDay}`
                });
              }

  onLogoutClick() {
    this.authService.logout();
    this.someServ.loginStatus(this.authService.loggedIn());
    this.router.navigate(['/']);
    return false;
  }



  ngOnInit() {

    this.someServ.status.subscribe(sts => {
      this.loggedInStatus = sts;
      if (this.loggedInStatus) {
        this.authService.getProfile()
        .subscribe( profile => {
          this.user = {
            main_balance: profile.user.main_balance,
            username: profile.user.username,
            bonus: profile.user.bonus,
            user_id: profile.user._id
          };
          this.user_id = this.user.user_id.substr(1, 8);
          this.someServ.editmsg(this.user.main_balance);
          this.someServ.editBonus(this.user.bonus);
          this.someServ.telecast.subscribe(msage => this.user_main_balance = msage);
          this.someServ.anotherTeleCast.subscribe(newBonus => this.user_bonus = newBonus);
        });
      }
    });
  }
}
