import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private httpClient: HttpClient) { }

  public getListOfDepartments(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/findalldepartment');
  }
}
