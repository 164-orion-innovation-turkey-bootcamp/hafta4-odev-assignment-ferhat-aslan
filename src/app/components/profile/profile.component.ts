import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  //data that in localstorage was pulled from browser.
  localStorage: any = localStorage.getItem('user');
  user = JSON.parse(this.localStorage);
  orders: any = [];
  products: any = [];
  constructor(private prSer: ProductService) {}

  ngOnInit(): void {
    //all user orders was pulled from server.
    this.prSer.getUserOrder().subscribe((res: any) => {
      res.map((order: Order) => {
        if (order.user_id == this.user.id) {
          this.orders.push(order);
          console.log(this.orders);
        }
      });
      this.pushproduct();
    });
  }
  //product was pushed to table
  pushproduct() {
    this.orders.map((peritem: any) => {
      this.prSer
        .getProductDetail(peritem.orders.product_id)
        .subscribe((res) => {
          this.products.push(res);
          console.log(res);
          console.log(this.products);
        });
    });
  }
}
