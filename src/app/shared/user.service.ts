import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  getUserAttendanceDetails(username: any) {
    let apiurl = 'http://localhost:8080/getAttendanceDetail/' + username;

    return this.http.get(apiurl);
  }
  
  logout() {
    sessionStorage.removeItem('loggedUser');
  }

  getUser(): any {
    let loggedUser: any = sessionStorage.getItem('loggedUser');
    if (loggedUser) {
      return JSON.parse(loggedUser);
    }
    return null;
  }

  isUserAvailable: boolean = false;

  isUserLoggedIn(): boolean {
    if (this.getUser() == null) {
      this.isUserAvailable = false;
    } else {
      this.isUserAvailable = true;
    }
    return this.isUserAvailable;
  }

 
  getListOfUsers(): Observable<any> {
    let apiurl = 'http://localhost:8080/getListOfUsers/';

    return this.http.get(apiurl);
  }

}
