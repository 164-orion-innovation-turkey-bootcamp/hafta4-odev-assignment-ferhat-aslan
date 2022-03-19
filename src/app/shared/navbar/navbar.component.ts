import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  searchString: string = '';
  public filterCategory: any;

  constructor(
    private pservice: ProductService,
    private cService: CartService,
    private rout: Router
  ) {}
  //2 subscriptions defined for unsubscribe when components destroy.
  sub!: Subscription;
  sub2!: Subscription;
//when app on destroyed, this func will be start.
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }
  itemNumber: number = 0;
  ngOnInit(): void {
    this.sub = this.pservice.category.subscribe((res) => {
      this.filterCategory = res;
    });
    this.sub2 = this.cService.getProductList().subscribe((res) => {
      this.itemNumber = res.length;
    });
  }
  search(event: any) {
    this.searchString = event.target.value;
    console.log(event.target.value);

    this.pservice.search.next(this.searchString);
  }
  filter(category: string) {
    this.filterCategory = this.filterCategory.filter((a: any) => {
      if (a.category == category || category == '') {
        return a;
      }
    });
    this.pservice.category.next(this.filterCategory);
  }
  //this function was defined for the logout.

  logout() {
    localStorage.removeItem('user');
    this.rout.navigate(['../login']);
  }
  //this function was defined for login control.  for Ng If

  loginControl() {
    if (localStorage.getItem('user')) {
      return true;
    }
    return false;
  }
}
