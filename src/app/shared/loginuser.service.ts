import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../entityClasses/user';

@Injectable({
  providedIn: 'root',
})
export class LoginuserService {
  constructor(private httpClient: HttpClient) {}

  public loginUser(user: User): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8080/login', user);
  }

  // public getUser(id: any): Observable<any> {
  //   return this.httpClient.post<any>('http://localhost:8080/user/', id);
  // }
}
