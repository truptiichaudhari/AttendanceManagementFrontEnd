import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

  public adminLogin(admin: any): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8080/adminLogin', admin);
  }

}
