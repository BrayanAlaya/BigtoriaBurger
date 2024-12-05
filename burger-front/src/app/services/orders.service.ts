import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/Order,interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private _apiUrl: string = environment.apiUrl + "/order"

  constructor(
    private _http: HttpClient,

  ) {


  }


  post(order: Order, token: any): Observable<any> {

    const headers = new HttpHeaders().set("Authorization", token)
    return this._http.post(this._apiUrl, order, { headers: headers })

  }

  getSales(token: any): Observable<any> {

    const headers = new HttpHeaders().set("Authorization", token)
    return this._http.get(this._apiUrl + "/sales", { headers: headers })

  }

  get(token: any): Observable<any> {

    const headers = new HttpHeaders().set("Authorization", token)
    return this._http.get(this._apiUrl, { headers: headers })

  }

  getDash(token: any): Observable<any> {

    const headers = new HttpHeaders().set("Authorization", token)
    return this._http.get(this._apiUrl + "/dash", { headers: headers })

  }



}
