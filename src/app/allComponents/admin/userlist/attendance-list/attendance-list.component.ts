import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AttendanceService } from 'src/app/shared/attendance.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css']
})
export class AttendanceListComponent implements OnInit {

  currentUsername: String;
  attendanceList: any;
  attendanceForm: FormGroup;

  constructor( private activatedRoute: ActivatedRoute,
    private _user: UserService,
    private _attendance: AttendanceService,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.currentUsername = this.activatedRoute.snapshot.params['username'];
    this.getUserAttendanceDetails(this.currentUsername);
  }

  createFormGroup(attendance : any) {
    // Reactive Form :
    this.attendanceForm = this.formBuilder.group({
      date: ['', [Validators.required]],
      intime: ['', [Validators.required]],
      outtime: ['', [Validators.required]],
      user: ['attendance.user', [Validators.required]],
    });
  }

  getUserAttendanceDetails(username: any) {
    this._user.getUserAttendanceDetails(username).subscribe(
      (data) => {
        this.attendanceList = data;
      }, 
      (err) => {
        console.log("error while fetching admin attendance detail list");
      });
    }
    
  deleteUserAttendance(id:any) {
    this._attendance.deleteUserAttendance(id).subscribe(
      (data) => {
        this.getUserAttendanceDetails(this.currentUsername);
        console.log(data)
      },
      (err) => {
        alert("Attendance deleted successfully...");
        this.getUserAttendanceDetails(this.currentUsername);
        console.log(err)
      }
    )
  }

  updateUserAttendance(attendance:any) {
    this.createFormGroup(attendance);
  }

  onUpdate() {
    console.log("on update : " + JSON.stringify(this.attendanceForm.value))
  }
}
