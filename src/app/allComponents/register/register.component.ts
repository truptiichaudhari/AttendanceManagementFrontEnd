import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginuserService } from '../../shared/loginuser.service';
import { RegisterService } from '../../shared/register.service';
import { User } from '../../entityClasses/user';
import { UserService } from 'src/app/shared/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/shared/department.service';
import { Department } from 'src/app/entityClasses/department';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: User = new User();

  userForm: FormGroup;
  userdata: any;
  RegisterData: User;
  allDepartments: Array<Department>
  // allDepartments: Array<{departmentName:String,noOfEmployee:String}> = [
  //   {
  //       departmentName: "HR",
  //       noOfEmployee: "20"
  //   },
  //   {
  //       departmentName: "Store",
  //       noOfEmployee: "20"
  //   }
  // ]

  constructor(
    private userService: UserService,
    private loginuserservice: RegisterService,
    private formBuilder: FormBuilder,
    private toasterService: ToastrService,
    private _department: DepartmentService
  ) {
    this.getListOfDepartments();
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      emailId: ['', [Validators.required, Validators.email]],
      // department: ['', [Validators.required]],
      department: [null, [Validators.required]],
    });
  }

  getListOfDepartments() {
    this._department.getListOfDepartments().subscribe(
      (data) => {
        this.allDepartments = data;
        // console.log(this.departmentList)
      },
      (err) => {
      }
    )
  }


  // getRegisterData(){
  //   this.loginuserservice.getRegistration().subscribe((data)=>{
  //     this.RegisterData=data;
  //     console.log(this.RegisterData);
  //   })
  // }

  onSubmit() {
    if (this.userForm.valid) {
      this.userdata = this.userForm.value;
      this.loginuserservice.adduser(this.userdata).subscribe(
        (data) => {
          console.log('Response arrive inside onSubmit() ' + data);
          if (data != null) {
            this.RegisterData = data;
            console.log(this.RegisterData);
            this.toasterService.success('User Registration Sucessfully');
          } else {
            this.toasterService.warning('User Registration Failed');
          }
        },
        (error) => {
          console.log('High ' + JSON.stringify(error));
        }
      );
    } else {
      alert('User form is not valid!!');
    }
  }

  // constructor(
  //   private loginuserservice: RegisterService,
  //   private router: Router
  // ) {}

  // ngOnInit(): void {}
  // adduser() {
  //   console.log(this.user);
  //   this.loginuserservice.adduser(this.user).subscribe(
  //     (data) => {
  //       alert('Login Succesfully');
  //     },
  //     (error) => alert('Sorry please enter correct id and password')
  //   );
  // }
}
