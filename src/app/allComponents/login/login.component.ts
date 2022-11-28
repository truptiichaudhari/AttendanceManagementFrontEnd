import { UserService } from 'src/app/shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginuserService } from '../../shared/loginuser.service';
import { User } from '../../entityClasses/user';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = new User();
  loginForm: FormGroup;
  constructor(
    private _loginUser: LoginuserService,
    public _user: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    if (_user.isUserLoggedIn()) {
      if (_user.getUser() && _user.getUser().role == "admin") {
        this.router.navigateByUrl("/admin");
      } else {
        this.router.navigateByUrl("/user");
      }
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      emailId: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    //  debugger;
    if (this.loginForm.valid) {
      const logindata = this.loginForm.value;
      this._loginUser.loginUser(logindata).subscribe(
        (data) => {
          if (data != null) {
            this.user = data;
            data.role = "user";
            sessionStorage.setItem('loggedUser', JSON.stringify(data));
            this._user.isUserLoggedIn();
            this.router.navigate([`user/${this.user.username}`]);
            // this.router.navigate(['user/:username', { username: this.user.username }]);
            // this.router.navigate(['user', { username: this.user.username }]);
            // this.router.navigateByUrl('/user?'+this.user.username);
          } else {
            // this.toasterService.warning('Wrong Credentials');
          }
        },
        (error) => {
          // this.toasterService.warning('Wrong Credentials');
        }
      );
    }
  }

  // userLogin() {
  //   console.log(this.user);
  //   this.loginuserservice.loginUser(this.user).subscribe(
  //     (data) => {
  //       if (data != null) {
  //         logindata = data;
  //         console.log(logindata);
  //         sessionStorage.setItem('loggedUser', JSON.stringify(data));
  //         this.toasterService.success('Login Sucessfully');
  //         this._user.isUserLoggedIn();
  //         // this.router.navigate(['user', logindata.username]);
  //         this.router.navigateByUrl('/user');
  //       } else {
  //         this.toasterService.warning('Wrong Credentials');
  //       }
  //       // sessionStorage.setItem('loggedUser', JSON.stringify(data));
  //       // this.router.navigate(['user', { userData: JSON.stringify(data) }]);
  //     },
  //     (error) => {
  //       this.toasterService.warning('Wrong Credentials');
  //       alert('please enter correct id and password');
  //     }
  //   );
  // }
}
