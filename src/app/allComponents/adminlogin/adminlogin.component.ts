import { AdminService } from 'src/app/shared/admin.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  adminForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private _admin:AdminService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.createFormGroup();
  }

  
  createFormGroup() {
    this.adminForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.adminForm.valid) {
      const admin = this.adminForm.value;
      this._admin.adminLogin(admin).subscribe( 
        (data) => {
          console.log(data)
          data.role = "admin";
          sessionStorage.setItem('loggedUser', JSON.stringify(data));
          // this._user.isUserLoggedIn();
          this.router.navigateByUrl('/admin');
        }, 
        (err) => {

        })
    }
  }
  get username()
  {
    return this.adminForm.get('username');
  }
  get password()
  {
    return this.adminForm.get('password');
  }
}
