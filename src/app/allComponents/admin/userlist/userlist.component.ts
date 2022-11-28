import { User } from './../../../entityClasses/user';
import { UserService } from 'src/app/shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  usersList: Array<User>

  constructor(private _user: UserService, private router: Router) {
    this.getListOfUsers();
   }

  ngOnInit(): void {}

  getListOfUsers() {
    this._user.getListOfUsers().subscribe(
      (data) => {
        this.usersList = data;
      },
      (err) => {

      }
    )
  }

  showUserAttendance(user: User) {
    // sessionStorage.setItem("UserAttendance" , JSON.stringify(user));
    // this.router.navigateByUrl("/user");
    this.router.navigate([`admin/userslist/${user.username}`]);

  }

}
