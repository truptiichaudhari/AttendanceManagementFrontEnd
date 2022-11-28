import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/entityClasses/user';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedUser: User;
  constructor(public _user : UserService,
    private router : Router) { }

  ngOnInit(): void {

  }

  logout()
  {
    this._user.logout();
    this.router.navigateByUrl("/userlogin");
  }

  isAdminUser() {
    if (this._user.isUserLoggedIn()) {
      if (this._user.getUser() && this._user.getUser().role == "admin") {
        return true;
      } 
    }
    return false;
  }

}
