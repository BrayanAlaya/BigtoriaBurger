import { DoCheck, Injectable, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _dbUrl: string = environment.apiUrl + "/cart"

  constructor(
    private _userService: UserService,
    private _http: HttpClient
  ) { 
    
  }

  post(cart: any, token: any): Observable<any> {

    const headers = new HttpHeaders().set("Authorization", token)
    return this._http.post(this._dbUrl, cart, {headers: headers})

  }
  
  get(token: any): Observable<any> {

    const headers = new HttpHeaders().set("Authorization", token)
    return this._http.get(this._dbUrl, {headers: headers})

  }

  delete(id: any, token: any): Observable<any> {

    const headers = new HttpHeaders().set("Authorization", token)
    const params = new HttpParams().set("id", id)

    return this._http.delete(this._dbUrl, {headers: headers, params: params})

  }

}
