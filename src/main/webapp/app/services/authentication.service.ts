import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  public login = (data: any): Observable<{token: string}> => {
    return this.http.post<{token: string}>('http://localhost:3000/auth', data);
  }
}
