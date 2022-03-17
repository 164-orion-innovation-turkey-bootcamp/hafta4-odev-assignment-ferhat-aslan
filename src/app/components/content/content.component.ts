import { AfterContentInit, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  searchKey: string = '';
  myVarilable:string="black"
  filterCategory:any =[];
  products: any = [];
  cartList:any;
  categoryForm!: FormGroup;
  constructor(private productService: ProductService, public fb: FormBuilder,private cartService:CartService) {}

  ngOnInit(): void {
    this.productService.search.subscribe((val: any) => {
      this.searchKey = val;
    });

    this.productService.getProducts().subscribe((res) => {
      this.filterCategory=res
      this.products = res;
      console.log('content girdi product aldı', res);
    });
  }
  changeCategory(event: any) {
    console.log(event.target.value);
    this.filter(event.target.value)
  }
  filter(category:string){
    this.filterCategory=this.products.filter((a:any)=>{
      if(a.category==category || category==''){return a}
    })
    console.log("filt"+this.filterCategory);

  }
  sort_by(field:any, reverse:any, primer:any){

    const key = primer ?
      function(x:any) {
        return primer(x[field])
      } :
      function(x:any) {
        return x[field]
      };

    reverse = !reverse ? 1 : -1;

    return function(a:any, b:any) {
      return a = key(a), b = key(b), reverse * ((a as any > b as any) - (b as any > a as any));
    }
  }
sorting(event:any){
  console.log(event.target.value);
  if(event.target.value===""){
    this.filterCategory=this.products
  }
  if(event.target.value==="price"){
    this.filterCategory=this.filterCategory.sort((a:any, b:any) => (Number(a.price) < Number(b.price) ? -1 : Number(a.price > b.price)))
  }
  if(event.target.value==="rating"){
    this.filterCategory=this.filterCategory.sort((a:any, b:any) => (Number(a.rating.rate) > Number(b.rating.rate) ? -1 : Number(a.rating.rate < b.rating.rate)))
  }
  console.log("sort"+this.products);

}
addtocart(product:any){
console.log(product);
this.cartService.addtoCart(product)
}


}
