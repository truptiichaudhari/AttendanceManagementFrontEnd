import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './allComponents/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './allComponents/register/register.component';
import { AdminComponent } from './allComponents/admin/admin.component';
import { HeaderComponent } from './allComponents/header/header.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminloginComponent } from './allComponents/adminlogin/adminlogin.component';
import { DepartmentComponent } from './allComponents/admin/department/department.component';
import { UserlistComponent } from './allComponents/admin/userlist/userlist.component';
import { UserComponent } from './allComponents/user/user.component';
import { AttendanceListComponent } from './allComponents/admin/userlist/attendance-list/attendance-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    AdminComponent,
    HeaderComponent,
    AdminloginComponent,
    DepartmentComponent,
    UserlistComponent,
    AttendanceListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
