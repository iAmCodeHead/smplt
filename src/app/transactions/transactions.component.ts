import { Component, OnInit } from '@angular/core';
import {MyTicketsService} from '../services/my-tickets.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  public transactions: any;
  user: any;

  constructor(private transaction_api: MyTicketsService,
    private authApi: AuthService) { }

  ngOnInit() {
    this.authApi.getProfile()
    .subscribe( profile => {
            const user_profile = {
              id: profile.user._id,
              bonus: profile.user.bonus,
              main_balance: profile.user.main_balance
            };
            this.user = user_profile;
            const ticketKey = {id: this.user.id};
            this.transaction_api.getMyTransactions(ticketKey)
            .subscribe(data => {
              this.transactions = data;
            });
          });
  }

}
