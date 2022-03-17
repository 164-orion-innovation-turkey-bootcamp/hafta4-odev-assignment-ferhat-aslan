import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartList:any =[]
public productList = new BehaviorSubject<any>([])
  constructor() { }
  getProductList(){
    return this.productList.asObservable();
  }
  setProduct(product:any){
    this.cartList.push(...product);
    this.productList.next(product);
  }
  addtoCart(product:any){
    this.cartList.push(product);
    this.productList.next(this.cartList)
  }
  removeCartItem(product:any){
    this.cartList.map((a:any,index:any)=>{
      if(product.id===a.id){
        this.cartList.splice(index,1)
      }
    });
    this.productList.next(this.cartList)
  }
  removeAllCart(){
    this.cartList=[];
    this.productList.next(this.cartList)
  }
}
