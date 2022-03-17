import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit,OnDestroy {
product:any;
id!:number
//a Subscription was defined for the unsubscribe.
sub!:Subscription;
  constructor(private productService:ProductService,private activatedRout:ActivatedRoute) { }
  //when component was destroyed,lastly this function have will be call.
  ngOnDestroy(): void {
    //unsubscribe operation
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    //url parameter was taken for the product details
    this.sub = this.activatedRout.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });
    this.productService.getProductDetail(this.id).subscribe(res=>{
      this.product=res;

    })
  }

}
