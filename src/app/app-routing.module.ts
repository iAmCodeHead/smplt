import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WinningTicketsComponent } from './winning-tickets/winning-tickets.component';
import { BodyComponent } from './body/body.component';
import { CategoriesComponent } from './categories/categories.component';
import { DepositComponent } from './deposit/deposit.component';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';
import { ProfileComponent } from './profile/profile.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { RegisterComponent } from './register/register.component';
import { PlayComponent } from './play/play.component';
import { PaymentComponent } from './payment/payment.component';
import { AuthGuard } from './guards/auth.guard';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { HowToPlayComponent } from './how-to-play/how-to-play.component';
import { BonusesComponent } from './bonuses/bonuses.component';
import { MonthlyBonusesComponent } from './monthly-bonuses/monthly-bonuses.component';

const routes: Routes = [
  // {path: 'categories/play/:id', component: PlayComponent, canActivate: [AuthGuard]},
  {path: 'winning-tickets', component: WinningTicketsComponent},
  {path: 'h', component: HeaderComponent, runGuardsAndResolvers: 'always'},
  {path: '', component: BodyComponent},
  {path: 'about', component: AboutComponent},
  {path: 'how-to-play', component: HowToPlayComponent},
  {path: 'bonuses', component: BonusesComponent},
  {path: 'monthly-jackpot', component: MonthlyBonusesComponent},
  // {path: 'login/register', component: RegisterComponent},
  // {path: 'play/:id', component: PlayComponent, canActivate: [AuthGuard]},
  {path: 'play', component: PlayComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'deposit', component: DepositComponent, canActivate: [AuthGuard]},
  {path: 'payment', component: PaymentComponent, canActivate: [AuthGuard]},
  {path: 'my-tickets', component: MyTicketsComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuard]},
  {path: 'withdraw', component: WithdrawComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
