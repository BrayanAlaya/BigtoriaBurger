import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { User } from '../models/User.intercae';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private _dbUrl: string

  constructor(
    private _http: HttpClient,
    private _r: Router,
  ) {
    this._dbUrl = environment.apiUrl;
  }

  login(user: User): Observable<any> {
    return this._http.post(this._dbUrl + "/user/login", user)
  }

  update(user: User, token: any): Observable<any> {

    const headers = new HttpHeaders({
      "Authorization": token,
    })

    return this._http.put(this._dbUrl + "/user", user, { headers: headers })
  }

  delete(token: any): Observable<any> {
    const headers = new HttpHeaders({
      "Authorization": token,
    })

    return this._http.delete(this._dbUrl + "/user/", { headers: headers })
  }

  register(user: any): Observable<any> {
    return this._http.post(this._dbUrl + "/user", user)
  }

  getLocalUSer(): User | null {

    if (localStorage.getItem("user") == null) {
      return null
    }

    return JSON.parse(localStorage.getItem("user") ?? "");
  }

  getLocalToken(): String | null {

    return localStorage.getItem("token");
  }

  closeSesion(): void {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    this._r.navigate(["/"])
  }

}
