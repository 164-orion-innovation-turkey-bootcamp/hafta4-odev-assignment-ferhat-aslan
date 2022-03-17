import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Route, Router, RouterLinkActive } from '@angular/router';
import { Order } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart', ///when we use this component at the parent component we will use this name.
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService,private routen:Router,private prSer:ProductService) {}

OrderList:Order[]=[];
  leng: number=0;
  totalPrice:number=0;
  cartItems:any =[];
  //was taken user data from localstorage
  lstorage:any=localStorage.getItem('user')
  user=JSON.parse(this.lstorage)
  ngOnInit(): void {
        //getproductlist is a observable. if we want to pull data, we have to use the subscribe.

    this.cartService.getProductList().subscribe((res) => {
      this.cartItems=res
      this.leng = res.length;
      res.map((a:any)=>{
        this.totalPrice= a.price+this.totalPrice
      });

    });
  }
  //a function was defined for removing from cart
  removeCart(product:any){
    this.cartService.removeCartItem(product)
    this.leng=this.cartItems.length
    this.totalPrice=0

    this.cartItems.map((a:any)=>{

      this.totalPrice= a.price+this.totalPrice
    });
  }
  //a function for order process
  order(){

    this.OrderList=this.cartItems.map((item:any)=>{
      //all cart items convert to Order model
      return{
        user_id:this.user.id,orders:{product_id:item.id,count:1}
      }
    });

for (let index = 0; index < this.OrderList.length; index++) {
  const element = this.OrderList[index];
  //and pushed the server
  this.prSer.order(element).subscribe(res=>{

  },err=>{

  })
}

//a confirm dialog package was used.
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
//after all order process, the cart list was cleared.
    this.cartService.productList.next([])
      }
    })



  }
}
