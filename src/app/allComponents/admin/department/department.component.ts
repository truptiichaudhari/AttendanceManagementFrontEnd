import { DepartmentService } from './../../../shared/department.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department } from 'src/app/entityClasses/department';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  departmentForm: FormGroup;
  departmentList: Array<Department>;
  constructor(private formBuilder: FormBuilder,
    private _department: DepartmentService) {
      this.getListOfDepartments();    
  }

  ngOnInit(): void {
    // this.createFormGroup();
  }

  // createFormGroup() {
  //   this.departmentForm = this.formBuilder.group({
  //     departmentName: ['', [Validators.required]],
  //     noOfEmployee: ['', [Validators.required]],
  //   });
  // }

  getListOfDepartments() {
    this._department.getListOfDepartments().subscribe(
      (data) => {
        this.departmentList = data;
        console.log(this.departmentList)
      },
      (err) => {
      }
    )
  }
}
