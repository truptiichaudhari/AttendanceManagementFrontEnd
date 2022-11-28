import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../entityClasses/user';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private httpClient: HttpClient) {}
  public adduser(user: User): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8080/adduser', user);
  }
}
