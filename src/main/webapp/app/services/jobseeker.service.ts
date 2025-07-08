import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {JobSeekerDto} from "../model/JobSeekerDto";
import {PaginationResponse} from "../model/PaginationResponse";
import {JobSeekerFilter} from "../model/JobSeekerFilter";
import {JobSeekerInputPagination} from "../model/export class JobSeekerInputPagination";

@Injectable({
  providedIn: 'root'
})
export class JobseekerService {

  constructor(private http: HttpClient) { }

  public getAllLazy(lazyData: JobSeekerInputPagination): Observable<PaginationResponse<JobSeekerDto>> {
    const options = {
      headers: {'Content-Type': 'application/json'},
      withCredentials: true
    };
    return this.http.post<PaginationResponse<JobSeekerDto>>('http://localhost:8080/api/jobseeker', lazyData, options);
  }

  public getJobSeekerById(id: number): Observable<any> {
    const headers = {headers: {'Content-Type': 'application/json'}, withCredentials: true};
    return this.http.get<any>(`http://localhost:8080/api/jobseeker/${id}`, headers);
  }
}
