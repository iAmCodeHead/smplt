import { Component, OnInit, OnDestroy } from '@angular/core';
import { CouponService } from '../services/coupon.service';
import * as moment from 'moment';
import { AuthService } from '../services/auth.service';
import { CountdownService } from '../services/countdown.service';
import { interval } from 'rxjs';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  secondsCounter = interval(100);
  oldate = moment();
  currentDate = this._countdown.currentDate;
  currentDay = this._countdown.currentDay;
  day = this._countdown.day;
  month = this._countdown.month;
  year = this._countdown.year;
  today = this.year + '-' + this.month + '-' + this.day;
  now = Date.now();
  user: any;
  newCount = this.today + ' 17:45:00';
  signalStatus = this._countdown.signalStatus;
  formattedToday = this.oldate.format('dddd');
  tommorrow = moment().add(1, 'days');
  formattedTomorrow = this.tommorrow.format('dddd');
  date = this.signalStatus ? this.formattedTomorrow : this.formattedToday;
  loading = false;
  all_categories: any;

  constructor(private categoryGetter: CouponService,
    private authService: AuthService,
    private _flashMessagesService: FlashMessagesService,
    private _countdown: CountdownService) { }


    tomorrowday: number = this._countdown.tomorrowday;
    tomorrowmonth = this._countdown.tomorrowmonth;
    tomorrowyear = this._countdown.tomorrowyear;
    another_tomorrow = this.tomorrowyear + '-' + this.tomorrowmonth + '-' + this.tomorrowday;
    winners = 0;

    afterCountDown() {
    this.signalStatus = true;
    this.newCount = this.another_tomorrow + ' 17:45:00';
    this.date = this.formattedTomorrow;
    }


  ngOnInit() {

    this.loading = true;
    // this.secondsCounter.subscribe(n => {
      this.authService.getProfile().subscribe(profile => {
        this.user = profile.user;
      if (this.user.main_balance < 25) {
        this._flashMessagesService.show(`Welcome ${this.user.firstname}.
  Get 100% bonus on your first deposit and 20% bonus on every other deposit above 1,000 Naira`, {cssClass: 'alert-info', timeout: 10000});
      }
        }, error => {
        return false;
      });
 //   });

        this.categoryGetter.fetchCategories().subscribe(categories => {
          this.all_categories = categories;
          this.loading = false;
        }, error => {
          console.log(error);
          return false;
        });


  }

}
