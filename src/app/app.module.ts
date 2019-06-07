import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { Angular4PaystackModule } from 'angular4-paystack';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { WinningTicketsComponent } from './winning-tickets/winning-tickets.component';
import { CategoriesComponent } from './categories/categories.component';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';
import { ProfileComponent } from './profile/profile.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { RegisterComponent } from './register/register.component';
import { CouponService } from './services/coupon.service';
import { MyTicketsService } from './services/my-tickets.service';
import { PlayComponent } from './play/play.component';
import { RegisterService } from './services/register.service';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PaymentComponent } from './payment/payment.component';
import { CounterDirective } from './counter.directive';
import { CountdownTimerModule } from 'ngx-countdown-timer';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { FilterPipe } from './filter.pipe';
import { AboutComponent } from './about/about.component';
import { HowToPlayComponent } from './how-to-play/how-to-play.component';
import { BonusesComponent } from './bonuses/bonuses.component';
import { MonthlyBonusesComponent } from './monthly-bonuses/monthly-bonuses.component';

// const config: SocketIoConfig = { url: 'http://localhost:3000/', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    WinningTicketsComponent,
    CategoriesComponent,
    MyTicketsComponent,
    ProfileComponent,
    DepositComponent,
    WithdrawComponent,
    TransactionsComponent,
    RegisterComponent,
    PlayComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    PaymentComponent,
    AdminloginComponent,
    CounterDirective,
    FilterPipe,
    AboutComponent,
    HowToPlayComponent,
    BonusesComponent,
    MonthlyBonusesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    Angular4PaystackModule,
    FlashMessagesModule.forRoot(),
    CountdownTimerModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.chasingDots,
      fullScreenBackdrop: true,
      backdropBackgroundColour: '#002433',
      primaryColour: '#fff',
      secondaryColour: '#FEBF00',
      tertiaryColour: '#FEBF00'
    }),
  //  SocketIoModule.forRoot(config)
  ],
  providers: [
    CouponService,
    MyTicketsService,
    RegisterService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
