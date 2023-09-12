import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styles: [
  ]
})
export class ProductDetailComponent implements OnInit {

  product: IProduct;
  id: string;

  constructor(private shopService: ShopService, private route: ActivatedRoute, private bcService: BreadcrumbService) {
    bcService.set('@productDetails', ' ')
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadProduct();
  }
  loadProduct() {
    this.shopService.getProduct(+this.id).subscribe({
      next: (product: any) => {
        this.product = product;
        this.bcService.set('@productDetails', product.name)
      },
      error: (err: any) => {
        console.log(err);

      }
    });
  }

}
