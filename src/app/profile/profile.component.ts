import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { RandomService } from '../services/random.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  profileForm: FormGroup;
  loading = false;



    constructor(private fb: FormBuilder,
      private flashMessagesService: FlashMessagesService,
      private authService: AuthService,
      private someServ: RandomService,
      private router: Router) { }


    updateUser() {
      this.loading = true;
      const formData = this.profileForm.value;
      const reqData = {
        user_id: this.user._id,
        surname: formData.surname,
        firstname: formData.firstname,
        // lastname: formData.lastname,
        state: formData.state,
        email: formData.email,
        mobile_no: formData.mobile_no,
        username: this.user.username,
        old_password: formData.old_password,
        password: formData.password,
        confirm_password: formData.confirm_password
      };
      // console.log(reqData);
      if (formData.old_password === formData.confirm_password) {
        this.authService.updateUser(reqData)
        .subscribe(response => {
          this.flashMessagesService.show(response.msg, {cssClass: 'alert-success', timeout: 3000 });
          return false;
        }, error => {
          this.flashMessagesService.show(error.msg, {cssClass: 'alert-danger', timeout: 3000 });
        });
      } else {
        window.scroll(0, 0);
        this.flashMessagesService.show('PASSWORD does not match CONFIRM PASSWORD', {cssClass: 'alert-info', timeout: 3000 });
      }
      this.loading = false;

    }



  ngOnInit() {
    this.loading = true;

    const userId = window.localStorage.getItem('id_token');
    if (!userId) {
      alert('Invalid action.');
      this.router.navigate(['/']);
      return;
    }

  this.profileForm = this.fb.group({
    _id: [''],
    surname: [{value: '', disabled: true}, Validators.required],
    firstname: [{value: '', disabled: true}, Validators.required],
    // lastname: [{value: '', disabled: true}, Validators.required],
    state: ['', Validators.required],
    username: [{value: '', disabled: true}, Validators.required],
    old_password: ['', Validators.required],
    password: ['', Validators.required],
    confirm_password: ['', Validators.required],
    email: ['', Validators.required],
    mobile_no: ['', Validators.required],
    main_balance: [''],
    bonus: [''],
    __v: ['']
  });


    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      this.profileForm.setValue({
        _id: profile.user._id,
        surname:  profile.user.surname,
        firstname: profile.user.firstname,
        // lastname: profile.user.lastname,
        state: profile.user.state,
        username: profile.user.username,
        old_password: '',
        password: '',
        confirm_password: '',
        email: profile.user.email,
        mobile_no: profile.user.mobile_no,
        main_balance: profile.user.main_balance,
        bonus: profile.user.bonus,
        __v: profile.user.__v
      });
    }, error => {
      console.log(error);
      return false;
    });

    this.loading = false;

  }
}
