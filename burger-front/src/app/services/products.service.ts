import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  private _dbUrl: string
  


  constructor(
    private _http: HttpClient,
    private _r: Router,
  ) {
    this._dbUrl = environment.apiUrl + "/products";

  }

  create(product: any, token: any): Observable<any>{

    const headers = new HttpHeaders().set("Authorization", token)

    return this._http.post(this._dbUrl, product, {headers: headers})

  }

  update(product: any, id: any, token: any): Observable<any>{

    const headers = new HttpHeaders().set("Authorization", token)
    const params = new HttpParams().set("id", id)

    return this._http.put(this._dbUrl, product, {headers: headers, params: params})

  }
  
  get(id: string | number = ""): Observable<any>{
    
    const params = new HttpParams()
      .set("id", id)
    
    return this._http.get(this._dbUrl, {params: params})
  }
  
  delete(id: any, token: any): Observable<any>{

    const headers = new HttpHeaders().set("Authorization", token)
    const params = new HttpParams().set("id", id)

    return this._http.delete(this._dbUrl, {headers: headers, params: params})

  }

}
