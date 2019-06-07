import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { RandomService } from '../services/random.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  angForm: FormGroup;
  resetFormField: FormGroup;
  loading = false;
  forgotPwd = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService,
    private someServ: RandomService,
    private router: Router) { this.createForm(); this.resetForm(); }

  createForm() {
    this.angForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  resetForm() {
    this.resetFormField = this.fb.group({
      username: ['', Validators.required]
    });
  }

  forgotPassword() {
    this.forgotPwd = true;
  }

  validateUsername(inputTxt) {
    const numbers = /^[0-9]+$/;
    if (inputTxt.match(numbers)) {
      return true;
    } else {
      return false;
    }
  }

  randomString(length) {
    let result = '';
    const chars = '0123456789AabcdefghijklmnopqrstuvwxyzBCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = length; i > 0; --i) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }

  resetSubmit() {
    this.loading = true;
    const resetDataValue = this.resetFormField.value;
    const resetData = {
      username: resetDataValue.username,
      new_pwd: this.randomString(6)
      // verify: this.validateUsername(this)
    };
    const verify = this.validateUsername(resetData.username);
    if (verify) {
      // reset pwd and send an sms
      this.authService.resetUserWithPhoneNumber(resetData).subscribe(res => {
        if (res.success) {
          this.flashMessagesService.show(res.msg, {cssClass: 'alert-success'});
        } else {
          this.flashMessagesService.show(res.msg, {cssClass: 'alert-danger'});
        }
      });
    }
    if (!verify) {
      // reset pwd and send a mail.
      this.authService.resetUser(resetData).subscribe(res => {
        if (res.success) {
          this.flashMessagesService.show(res.msg, {cssClass: 'alert-success'});
        } else {
          this.flashMessagesService.show(res.msg, {cssClass: 'alert-danger'});
        }
      });
    }
    this.forgotPwd = false;
    this.loading = false;
  }

  loginSubmit() {
    const formData = this.angForm.value;
    const reqData = {
      username: formData.username,
      password: formData.password
    };
    const verify = this.validateUsername(reqData.username);
    if (verify) {
      this.loading = true;
      this.authService.authenticateUserWithPhoneNumber(reqData)
      .subscribe(response => {
        if (response.success) {
          this.authService.storeUserData(response.token);
          this.someServ.loginStatus(this.authService.loggedIn());
          this.router.navigate(['/']);
        } else {
          this.flashMessagesService.show(response.msg, {cssClass: 'alert-danger'});
        }
        this.loading = false;
      }, error => {

      });

    this.angForm.reset();
    } else {
      this.loading = true;

      this.authService.authenticateUser(reqData)
      .subscribe(response => {
        if (response.success) {
          this.authService.storeUserData(response.token);
          this.someServ.loginStatus(this.authService.loggedIn());
          // this.flashMessagesService.show('You are now logged in', {cssClass: 'alert-success'});
        //  console.log(response.msg);
          this.router.navigate(['/']);
          // this.router.navigate(['/play/1']);
        } else {
          this.flashMessagesService.show(response.msg, {cssClass: 'alert-danger'});
        //  console.log(response.msg);
         // this.router.navigate(['/']);
        }
        this.loading = false;
      }, error => {

      });

    this.angForm.reset();
    }
  }

  ngOnInit() {
  }

}
