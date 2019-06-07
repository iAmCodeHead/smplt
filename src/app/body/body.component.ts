import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as moment from 'moment';
import { RandomService } from '../services/random.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  loggedInStatus: any;
  nearestDrawId: any;
  testing: any;
  final_list: any;

  firstDraw = this.drawTimer(1, 'dddd, MMMM Do');
  secondDraw = this.drawTimer(3, 'dddd, MMMM Do');
  thirdDraw = this.drawTimer(5, 'dddd, MMMM Do');


  categoryToday = [

    {day: 'Monday', category: ['25k', '50k', '100k', '200k']}

  ];


  drawTimer(dayINeed, formatTpye) {
    const today = moment().isoWeekday();
    if (today <= dayINeed) {
      return (moment().isoWeekday(dayINeed).format(formatTpye));
    } else {
      return (moment().add(1, 'weeks').isoWeekday(dayINeed).format(formatTpye));
    }
  }


  constructor(private authService: AuthService, private someServ: RandomService) {
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

  ngOnInit() {
    // this.loggedInStatus = this.authService.loggedIn();
    this.someServ.status.subscribe(ts => this.loggedInStatus = ts);
  }

}
