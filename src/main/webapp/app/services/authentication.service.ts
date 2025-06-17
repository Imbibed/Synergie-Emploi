import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  private userSubject: BehaviorSubject<{username: string, roles: string[]} | undefined> = new BehaviorSubject<{username: string; roles: string[]} | undefined>(undefined);
  public getUser(): {username: string, roles: string[]} | undefined {
    return this.userSubject.value;
  }

  public setUser(user: {username: string, roles: string[]} | undefined): void {
    this.userSubject.next(user);
  }

  public login = (data: any): Observable<void> => {
    const headers = {headers: {'Content-Type': 'application/json'}, withCredentials: true}
    return this.http.post<void>('http://localhost:8080/api/login', {username: data.username, password: data.password}, headers);
  }

  public isLogged = () : Observable<{username: string, roles: string[]}> => {
  const headers = {headers: {'Content-Type': 'application/json'}, withCredentials: true}
  return this.http.get<{username: string, roles: string[]}>('http://localhost:8080/api/login', headers);
  }
}
