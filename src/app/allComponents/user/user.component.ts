import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AttendanceService } from 'src/app/shared/attendance.service';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  attendanceForm: FormGroup;
  userData: any;
  attendanceList: any;
  currentUsername: String;
  
  constructor(private _user: UserService,
    private router : Router,
    private formBuilder: FormBuilder,
    private _attendance: AttendanceService,
    private activatedRoute: ActivatedRoute
    ) {
    if (!_user.isUserLoggedIn()) {
      this.router.navigateByUrl("/userlogin");
    }
  }
  ngOnInit() {
    this.currentUsername = this.activatedRoute.snapshot.params['username'];
    this.userData = this._user.getUser();
    this.createFormGroup();
    this.getuser(this.currentUsername);


    // this.activatedRoute.params.subscribe(params => {
    //   const userId = params['username'];
    //   console.log(userId);
    // });
  }
  createFormGroup() {
    // Reactive Form :
    this.attendanceForm = this.formBuilder.group({
      date: ['', [Validators.required]],
      intime: ['', [Validators.required]],
      outtime: ['', [Validators.required]],
      user: [this.userData, [Validators.required]],
    });
  }
  getuser(username: any) {
    this._user.getUserAttendanceDetails(username).subscribe((data) => {
      this.attendanceList = data;
    });
  }

  onSubmit() {
    console.log(this.attendanceForm)
    if (this.attendanceForm.valid) {
      this.attendanceList = this.attendanceForm.value;
      this._attendance.addUserAttendance(this.attendanceList).subscribe(
        (data) => {
          alert("Attendance marked successfully")
          this.router.navigateByUrl("/userlogin");
        },
        (err) => {
          this.getuser(this.userData.username);
          alert("Attendance marked successfully")
          
          // this.router.navigateByUrl("/userlogin");
          console.log("Mark Attendance Error : ", this._attendance)
        }
      )
    }
    
  }



}
