import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styles: [
  ]
})
export class ProductDetailComponent implements OnInit {

  product: IProduct;
  id: number;

  constructor(private shopService: ShopService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    this.loadProduct();
  }
  loadProduct() {
    this.shopService.getProduct(this.id).subscribe({
      next: (product: any) => {
        this.product = product;
      },
      error: (err: any) => {
        console.log(err);

      }
    });
  }

}
