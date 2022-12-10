import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AttendanceService } from 'src/app/shared/attendance.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css']
})
export class AttendanceListComponent implements OnInit {

  currentUsername: String = "";
  attendanceList: any;
  attendanceForm: FormGroup;
  currentAttendence: any;

  constructor( private activatedRoute: ActivatedRoute,
    private _user: UserService,
    private _attendance: AttendanceService,
    private formBuilder: FormBuilder, private _router: Router
    ) { }

  ngOnInit(): void {
    this.currentUsername = this.activatedRoute.snapshot.params['username'];
    this.getUserAttendanceDetails(this.currentUsername);
    this.createFormGroup();
  }

  createFormGroup() {
    // Reactive Form :
    this.attendanceForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      date: ['', [Validators.required]],
      intime: ['', [Validators.required]],
      outtime: ['', [Validators.required]],
      user: ['', [Validators.required]],
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
    attendance.date = attendance.date.slice(0,10);
    this.currentAttendence = attendance;
    
  }

  onUpdate() {
    if (!this.attendanceForm.valid) {
      this.attendanceForm.value.id = this.attendanceForm?.value?.id ?  this.attendanceForm.value.id : this.currentAttendence.id;
      this.attendanceForm.value.date = this.attendanceForm?.value?.date ?  this.attendanceForm.value.date : this.currentAttendence.date;
      this.attendanceForm.value.intime = this.attendanceForm?.value?.intime ?  this.attendanceForm.value.intime : this.currentAttendence.intime;
      this.attendanceForm.value.outtime = this.attendanceForm?.value?.outtime ?  this.attendanceForm.value.outtime : this.currentAttendence.outtime;
      this.attendanceForm.value.user = this.attendanceForm?.value?.user ?  this.attendanceForm.value.user : this.currentAttendence.user;
    }

    this.attendanceList = this.attendanceForm.value;
    this._attendance.updateUserAttendance(this.attendanceList).subscribe(
      (data) => {
        alert("Failed to update attendence");
      },
      (err) => {
        if(err.status == 200) {
          alert("Attendance updated successfully");
          this.reloadCurrentRoute();
        } else
          alert("Failed to update attendence");
      }
    )    
  }

  reloadCurrentRoute() {
    window.location.reload();
    // let currentUrl = this._router.url;
    // this._router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    //     this._router.navigate([currentUrl]);
    //     console.log(currentUrl);
    // });
  }

}
