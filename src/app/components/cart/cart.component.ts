import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Route, Router, RouterLinkActive } from '@angular/router';
import { Order } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit,OnChanges {
  constructor(private cartService: CartService,private routen:Router,private prSer:ProductService) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.totalPrice=0
    this.cartService.getProductList().subscribe((res) => {
      this.cartItems=res
      this.leng = res.length;
      console.log('length' + this.leng);
      res.map((a:any)=>{
        this.totalPrice= a.price+this.totalPrice
      });
      console.log("total "+ this.totalPrice);

    });

  }
OrderList:Order[]=[];
  leng: number=0;
  totalPrice:number=0;
  cartItems:any =[];
  lstorage:any=localStorage.getItem('user')
  user=JSON.parse(this.lstorage)
  ngOnInit(): void {
    this.cartService.getProductList().subscribe((res) => {
      this.cartItems=res
      this.leng = res.length;
      console.log('length' + this.leng);
      res.map((a:any)=>{
        this.totalPrice= a.price+this.totalPrice
      });
      console.log("total "+ this.totalPrice);

    });
  }
  cartLength() {
    if (this.leng > 0) {
      return true;
    } else {
      return false;
    }
  }
  removeCart(product:any){
    this.cartService.removeCartItem(product)
    this.leng=this.cartItems.length
    this.totalPrice=0

    this.cartItems.map((a:any)=>{

      this.totalPrice= a.price+this.totalPrice
    });
  }
  order(){
    console.log("id"+this.user.id);

    this.OrderList=this.cartItems.map((item:any)=>{
      return{
        user_id:this.user.id,orders:{product_id:item.id,count:1}
      }
    });
console.log("Order List");
console.log(this.OrderList);
for (let index = 0; index < this.OrderList.length; index++) {
  const element = this.OrderList[index];
  this.prSer.order(element).subscribe(res=>{
    console.log(res);

  },err=>{
    console.log(err);

  })
}


    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, order it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'ordered!',
          'Your order has been accepted.',
          'success'
        );
        this.routen.navigate(['home'])

    this.cartService.productList.next([])
      }
    })



  }
}
