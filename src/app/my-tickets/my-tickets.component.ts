import { Component, OnInit } from '@angular/core';
import {MyTicketsService} from '../services/my-tickets.service';
import {AuthService} from '../services/auth.service';
import {FilterPipe} from '../filter.pipe';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.css'],
  providers: [FilterPipe]
})


export class MyTicketsComponent implements OnInit {


  public my_tickets: any;
  loading = false;
  user;
  term: any;

  constructor(private _my_tickets: MyTicketsService,
    private spinnerService: Ng4LoadingSpinnerService,
    private authApi: AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.authApi.getProfile().subscribe(profile => {
          const user_profile = {
            id: profile.user._id,
            bonus: profile.user.bonus,
            main_balance: profile.user.main_balance
          };
          this.user = user_profile;
          // console.log(this.user.id);

          const ticketKey = {id: this.user.id};
          // console.log(ticketKey);
      this._my_tickets.getMyTickets(ticketKey)
      .subscribe(data => this.my_tickets = data);
        });
    this.loading = false;
    }

}
