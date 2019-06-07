import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { phoneNumberValidator } from '../validators/phone-validator';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CouponService } from '../services/coupon.service';
import { AuthService } from '../services/auth.service';
import { CountdownService } from '../services/countdown.service';
import { MyTicketsService } from '../services/my-tickets.service';
import { RandomService } from '../services/random.service';
import * as moment from 'moment';
import { interval } from 'rxjs';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  @Input() newRandMsg: string;
  angForm1: FormGroup;
  angForm2: FormGroup;
  angForm3: FormGroup;
  game_id: any;
  id: any;
  stake_amt: any;
  potential_winning: any;
  newUserInfo: object;
  user: any;
  last5tickets: any;
  updateData;
  newMain_balance: Number;
  public loading = false;
  message: any;
  editedMsg: any;
  account = this.api.loadUser();
  loggedInStatus: any;
  testing: any;
  final_list: any;

  secondsCounter = interval(100);
  oldate = moment();
  currentDate = this._countdown.currentDate;
  currentDay = this._countdown.currentDay;
  day = this._countdown.day;
  month = this._countdown.month;
  year = this._countdown.year;
  today = this.year + '-' + this.month + '-' + this.day;
  now = Date.now();
  draw_date: any;
  drawDate: any;
  nearestDrawId;
  newCount;
  signalStatus = this._countdown.signalStatus;
  formattedToday = this.oldate.format('dddd');
  tommorrow = moment().add(1, 'days');
  formattedTomorrow = this.tommorrow.format('dddd');
  date = this.signalStatus ? this.formattedTomorrow : this.formattedToday;
  // loading = false;
  all_categories: any;
  // formattedTestDay = this.testDay.format('dddd');
  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private transaction_api: MyTicketsService,
    private someServ: RandomService,
    private _countdown: CountdownService,
    private api: CouponService,
    private authApi: AuthService) {



    this.route.queryParams
    .filter(params => params.id)
    .subscribe(params => {
      this.id = params.id;
      window.scroll(0, 0);
      // this.someServ.gameId(params.id);
      // this.someServ.nextGameId.subscribe(newId => this.id = newId);
      this.drawDate = this.drawTimer(parseInt(this.id, 10), 'dddd, MMMM Do');
      this.countdownDetector(res => this.newCount = res.draw_date + ' 18:00:00');
    });


    this.loggedInStatus = this.authApi.loggedIn();
    this.createForm1();
    this.createForm2();
    this.createForm3();
    // this.countdownDetector(res => this.newCount = res.draw_date + ' 18:00:00');

    if (this.firstDraw < this.secondDraw && this.firstDraw < this.thirdDraw) {
      this.nearestDrawId = '1';
    }
    if (this.secondDraw < this.firstDraw && this.secondDraw < this.thirdDraw) {
      this.nearestDrawId = '2';
    }
    if (this.thirdDraw < this.firstDraw && this.thirdDraw < this.secondDraw) {
      this.nearestDrawId = '3';
    }



    const now = moment().format('DD');
    const newfirstDraw = this.drawTimer(1, 'DD');
    const newsecondDraw = this.drawTimer(3, 'DD');
    const newthirdDraw = this.drawTimer(5, 'DD');
    const test1 = (parseInt(newfirstDraw, 10) - parseInt(now, 10));
    const test2 = (parseInt(newsecondDraw, 10) - parseInt(now, 10));
    const test3 = (parseInt(newthirdDraw, 10) - parseInt(now, 10));

    this.testing = [];
    if (test1 < test2 && test1 < test3) {
      if (test2 < test3) {
        this.final_list = [
          {
          draw_date: this.firstDraw,
          draw_id: 1
          },
          {
            draw_date: this.secondDraw,
            draw_id: 3
          },
          {
            draw_date: this.thirdDraw,
            draw_id: 5
          }
      ];
      } else {
        this.final_list = [
          {
          draw_date: this.firstDraw,
          draw_id: 1
          },
          {
            draw_date: this.thirdDraw,
            draw_id: 5
          },
          {
            draw_date: this.secondDraw,
            draw_id: 3
          }
      ];
      }
      this.testing.push(this.final_list);
    } else if (test2 < test1 && test2 < test3) {
      if (test1 < test3) {
        this.final_list = [
          {
          draw_date: this.secondDraw,
          draw_id: 3
          },
          {
            draw_date: this.firstDraw,
            draw_id: 1
          },
          {
            draw_date: this.thirdDraw,
            draw_id: 5
          }
      ];
      } else {
        this.final_list = [
          {
          draw_date: this.secondDraw,
          draw_id: 3
          },
          {
            draw_date: this.thirdDraw,
            draw_id: 5
          },
          {
            draw_date: this.firstDraw,
            draw_id: 1
          }
      ];
      }
      this.testing.push(this.final_list);
    } else if (test3 < test1 && test3 < test2) {
      if (test1 < test2) {
        this.final_list = [
          {
          draw_date: this.thirdDraw,
          draw_id: 5
          },
          {
            draw_date: this.firstDraw,
            draw_id: 1
          },
          {
            draw_date: this.secondDraw,
            draw_id: 3
          }
      ];
      } else {
        this.final_list = [
          {
          draw_date: this.thirdDraw,
          draw_id: 5
          },
          {
            draw_date: this.secondDraw,
            draw_id: 3
          },
          {
            draw_date: this.firstDraw,
            draw_id: 1
          }
      ];
      }
      this.testing.push(this.final_list);
    } else {
      this.final_list = [];
      this.testing.push(this.final_list);
    }



  }

  firstDraw = this.drawTimer(1, 'dddd, MMMM Do');
  secondDraw = this.drawTimer(3, 'dddd, MMMM Do');
  thirdDraw = this.drawTimer(5, 'dddd, MMMM Do');



  drawTimer(dayINeed, formatTpye) {
    const today = moment().isoWeekday();
    if ((today <= dayINeed)) {
      return (moment().isoWeekday(dayINeed).format(formatTpye));
    } else {
      return (moment().add(1, 'weeks').isoWeekday(dayINeed).format(formatTpye));
    }
  }
  afterCountDown() {
  this.signalStatus = true;
  this.countdownDetector(res => {
    this.newCount = res.draw_date + ' 18:00:00';
    this.date = res.draw_date;
  });

}


  createForm1() {
    if (this.loggedInStatus) {
      this.angForm1 = this.fb.group({
        mobile_no: ['', [Validators.required, Validators.minLength(11), phoneNumberValidator]]
      });
    } else {
      this.angForm1 = this.fb.group({
        mobile_no: [{value: '', disabled: true}, [Validators.required, Validators.minLength(11), phoneNumberValidator]]
      });
    }

  }

  createForm2() {
    if (this.loggedInStatus) {
      this.angForm2 = this.fb.group({
        mobile_no: ['', [Validators.required, Validators.minLength(11), phoneNumberValidator]]
      });
    } else {
      this.angForm2 = this.fb.group({
        mobile_no: [{value: '', disabled: true}, [Validators.required, Validators.minLength(11), phoneNumberValidator]]
      });
    }
  }

  createForm3() {
    if (this.loggedInStatus) {
      this.angForm3 = this.fb.group({
        mobile_no: ['', [Validators.required, Validators.minLength(11), phoneNumberValidator]]
      });
    } else {
      this.angForm3 = this.fb.group({
        mobile_no: [{value: '', disabled: true}, [Validators.required, Validators.minLength(11), phoneNumberValidator]]
      });
    }
  }

  randomString(length) {
    let result = '';
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = length; i > 0; --i) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }

  registerGame(formName, stake_amt, potential_winning) {
    this.loading = true;
    const formData = formName.value;
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    if (this.id === '1' || this.id === '3' || this.id === '5') {
      this.detailsDetector(stake_amt, response => {
        this.draw_date = response.draw_date;
        this.game_id = response.game_id;
      });
    }
    this.authApi.getProfile().subscribe((data) => {
      this.user = {
        id: data.user._id,
        main_balance: data.user.main_balance,
        bonus: data.user.bonus
      };
    });
    const reqData = {
      mobile_no: formData.mobile_no,
      // game_id: game_id,
      game_id: this.game_id,
      user_id: this.user.id,
      ticket_id: `SL${this.randomString(9)}`,
      stake_amt: stake_amt,
      potential_winning: potential_winning,
      time_stamp: Date.now(),
      draw_time: '6 PM',
      draw_date: this.draw_date,
      ticket_status: 'pending'
    };
  //  console.log(reqData);
    if (this.user.bonus >= reqData.stake_amt) {
      const newbonus = (this.user.bonus - reqData.stake_amt);
      this.updateData = {
        user_id: this.user.id,
        main_balance: this.user.main_balance,
        bonus: newbonus
      };
    } else if (this.user.main_balance >= reqData.stake_amt) {
      this.newMain_balance = (this.user.main_balance - reqData.stake_amt);
      this.updateData = {
        user_id: this.user.id,
        main_balance: this.newMain_balance,
        bonus: this.user.bonus
      };
    } else {
      this.updateData = undefined;
    }
  //  console.log(this.updateData);
      const newData =   {
        user_id: this.user.id,
        amount_involved: reqData.stake_amt,
        transaction_type: 'stake',
        acct_balance: this.newMain_balance,
        time_stamp: Date.now(),
        trans_date: `${day}-${month}-${year}`
      };
      if (this.updateData !== undefined) {
        this.api.updateAcct(this.updateData)
        .subscribe(response => {
        this.someServ.editmsg(this.updateData.main_balance);
        this.someServ.editBonus(this.updateData.bonus);
          this.api.newTicket(reqData)
            .subscribe(ticketResponse => {
              this.loading = false;
              window.scroll(0, 0);
              this.flashMessagesService.show(ticketResponse.msg, { cssClass: 'alert-info', timeout: 5000 });
              this.transaction_api.newTransactions(newData)
              .subscribe(cat => {
                return true;
              });
            }, (error) => {
              window.scroll(0, 0);
              this.flashMessagesService.show('Failed, Please check your acct', { cssClass: 'alert-danger', timeout: 5000 });
            });
        }, (error) => {
          // console.log('UPDATE ERROR: ' + error);
        });
      } else {
        this.loading = false;
        window.scroll(0, 0);
        this.flashMessagesService.show('Insufficient balance, please deposit to play', { cssClass: 'alert-danger', timeout: 3000 });
      }

    this.angForm1.reset();
    this.angForm2.reset();
    this.angForm3.reset();

  }

  detailsDetector(stake_amt, callback) {
    const firstDrawDay = this.drawTimer(parseInt(this.id, 10), 'D');
    const firstDrawMonth = this.drawTimer(parseInt(this.id, 10), 'M');
    const firstDrawYear = this.drawTimer(parseInt(this.id, 10), 'Y');
    return callback({
      draw_date : `${firstDrawDay}-${firstDrawMonth}-${firstDrawYear}`,
      game_id : `${stake_amt}k-6pm-${this.drawTimer(parseInt(this.id, 10), 'ddd')}`
    });
  }


  countdownDetector(callback) {
    const firstDrawDay = this.drawTimer(parseInt(this.id, 10), 'D');
    const firstDrawMonth = this.drawTimer(parseInt(this.id, 10), 'M');
    const firstDrawYear = this.drawTimer(parseInt(this.id, 10), 'Y');
    return callback({
      draw_date : `${firstDrawYear}-${firstDrawMonth}-${firstDrawDay}`
    });
  }

  ngOnInit() {
    // this.countdownDetector(res => console.log(res.draw_date));
    window.scroll(0, 0);
    if (this.loggedInStatus) {
      this.authApi.getProfile()
      .subscribe( profile => {
              const user_profile = {
                id: profile.user._id,
                bonus: profile.user.bonus,
                main_balance: profile.user.main_balance
              };
              this.user = user_profile;
              const ticketKey = {id: this.user.id};
              this.transaction_api.getMyLast5Tickets(ticketKey)
              .subscribe(data => {
                this.last5tickets = data;
                // console.log(this.last5tickets);
              });
            });

    /**
     * Below is where the componenent gets a signal if it is
     * 5:45pm or not. if the signal is TRUE, it locks.
     */
      if (this._countdown.signalStatus) {
        this.router.navigate(['/']);
        this.flashMessagesService.show('Time is up! Tickets for next draw begins now.', { cssClass: 'alert-info', timeout: 5000 });
      }
    }
  }
}
