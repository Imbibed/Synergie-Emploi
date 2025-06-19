import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JobseekerService {

  constructor(private http: HttpClient) { }

  public getAllLazy(lazyData: {pageNumber: number, size: number}): Observable<any> {
    const headers = {headers: {'Content-Type': 'application/json'}, withCredentials: true};
    return this.http.post<any>('http://localhost:8080/api/jobseeker', lazyData, headers);
  }

  public getJobSeekerById(id: number): Observable<any> {
    const headers = {headers: {'Content-Type': 'application/json'}, withCredentials: true};
    return this.http.get<any>(`http://localhost:8080/api/jobseeker/${id}`, headers);
  }
}
