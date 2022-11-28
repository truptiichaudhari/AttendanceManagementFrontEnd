import { DepartmentComponent } from './allComponents/admin/department/department.component';
import { UserlistComponent } from './allComponents/admin/userlist/userlist.component';
import { AdminloginComponent } from './allComponents/adminlogin/adminlogin.component';
import { AdminComponent } from './allComponents/admin/admin.component';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './allComponents/login/login.component';
import { RegisterComponent } from './allComponents/register/register.component';
import { UserComponent } from './allComponents/user/user.component';
import { AttendanceListComponent } from './allComponents/admin/userlist/attendance-list/attendance-list.component';

const routes: Routes = [
  // https://stackoverflow.com/questions/39839072/how-to-router-navigate-to-a-route-with-an-id-placeholder-inmidst-the-route-url
  { path: '', redirectTo: '/userlogin', pathMatch: 'full' },
  { path: 'registeruser', component: RegisterComponent },
  { path: 'userlogin', component: LoginComponent },
  { path: 'adminlogin', component: AdminloginComponent },
  { path: 'user/:username', component: UserComponent },
  { path: 'admin', component: AdminComponent
  // ,
  //   children: [
    //     { path: '', redirectTo: 'departments', pathMatch: 'full' },
    //     { path: 'departments', component: UserlistComponent },
    //     { path: 'userslist', component: DepartmentComponent },
    //   ]   
  },
  { path: 'admin/userslist/:username', component: AttendanceListComponent },
  { path: 'admin/departments', component: DepartmentComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
