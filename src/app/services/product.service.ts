import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, map, Observable, of, retry } from 'rxjs';
import { Order } from '../models/order';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  newResponse:any
  apiURL = 'http://localhost:3000';
  public category = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<any>("");
lengt!:number;
  constructor(private http: HttpClient) { }
  getProducts<Product>(): Observable<Product> {
    return this.http
      .get<Product>('https://patika-server-app.herokuapp.com/products')
      .pipe(retry(5));
  }
  getProductDetail<T>(id:any): Observable<T> {
    return this.http
      .get<T>('https://patika-server-app.herokuapp.com/products/'+id)
      .pipe(retry(1));
  }
  order<T>(order:any): Observable<T> {
    return this.http
      .post<T>('https://patika-server-app.herokuapp.com/orders',order)
      .pipe();
  }
}
