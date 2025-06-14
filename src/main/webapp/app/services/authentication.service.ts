import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  public login = (data: any): Observable<{token: string}> => {
    const headers = {headers: {'Content-Type': 'application/json'}, withCredentials: true}
    return this.http.post<{token: string}>('http://localhost:8080/api/login', {username: data.username, password: data.password}, headers);
  }

  public isLogged = () : Observable<any> => {
  const headers = {headers: {'Content-Type': 'application/json'}, withCredentials: true}
  return this.http.get<any>('http://localhost:8080/api/login', headers);
  }
}
