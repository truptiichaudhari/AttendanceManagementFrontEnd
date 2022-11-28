import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private httpClient: HttpClient) { }

  public addUserAttendance(attendanceDetail: any): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8080/addAttendence', attendanceDetail);
  }

  public deleteUserAttendance(id: any): Observable<any> {
    return this.httpClient.delete<any>('http://localhost:8080/deleteUserAttendence/'+ id);
  }

}
