import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JobseekerService {

  constructor(private http: HttpClient) { }

  public getAllLazy(lazyData: {pageNumber: number, size: number}): Observable<any> {
    const options = {
      headers: {'Content-Type': 'application/json'},
      withCredentials: true,
      params: new HttpParams().append('page', lazyData.pageNumber).append('size', lazyData.size)
    };
    return this.http.get<any>('http://localhost:8080/api/jobseeker', options);
  }

  public getJobSeekerById(id: number): Observable<any> {
    const headers = {headers: {'Content-Type': 'application/json'}, withCredentials: true};
    return this.http.get<any>(`http://localhost:8080/api/jobseeker/${id}`, headers);
  }
}
