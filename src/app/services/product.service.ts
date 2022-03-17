import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  filter,
  map,
  Observable,
  of,
  retry,
} from 'rxjs';
import { Order } from '../models/order';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  newResponse: any;

  //the beahivorsubject was defined for category and search operations.
  public category = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<any>('');
  lengt!: number;
  constructor(private http: HttpClient) {}
  //this function was defined for the get all the products.
  getProducts<Product>(): Observable<Product> {
    return this.http
      .get<Product>('https://patika-server-app.herokuapp.com/products')
      .pipe();
  }
  //this function was defined for the get product detail.

  getProductDetail<T>(id: number): Observable<T> {
    return this.http
      .get<T>('https://patika-server-app.herokuapp.com/products/' + id)
      .pipe();
  }
  //this function was defined for the ordering.

  order<T>(order: Order): Observable<T> {
    return this.http
      .post<T>('https://patika-server-app.herokuapp.com/orders', order)
      .pipe();
  }
  //this function was defined for the user order.

  getUserOrder<T>(): Observable<T> {
    return this.http
      .get<T>('https://patika-server-app.herokuapp.com/orders')
      .pipe();
  }
}
