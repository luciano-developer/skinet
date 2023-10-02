import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styles: [],
})
export class ProductDetailComponent implements OnInit {
  product: IProduct;
  id: string;
  quantity = 1;
  quantityInBasket = 0;

  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private bcService: BreadcrumbService,
    private basketService: BasketService
  ) {
    bcService.set('@productDetails', ' ');
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadProduct();
  }
  loadProduct() {
    this.shopService.getProduct(+this.id).subscribe({
      next: (product: any) => {
        this.product = product;
        this.bcService.set('@productDetails', product.name);
        this.basketService.basketSource$.pipe(take(1)).subscribe({
          next: (basket) => {
            const item = basket?.items.find((x) => x.id === +this.id);
            if (item) {
              this.quantity = item.quantity;
              this.quantityInBasket = item.quantity;
            }
          },
        });
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    this.quantity--;
  }

  updateBasket() {
    if (this.product && this.isQuantityHigherThenQuantityBasket()) {
      const itemsToAdd = this.quantity - this.quantityInBasket;
      this.quantityInBasket += itemsToAdd;
      this.basketService.addItemToBasket(this.product, itemsToAdd);
    }

    if (this.product && !this.isQuantityHigherThenQuantityBasket()) {
      const itemsToRemove = this.quantityInBasket - this.quantity;
      this.quantityInBasket -= itemsToRemove;
      this.basketService.removeItemFromBasket(this.product.id, itemsToRemove);
    }
  }

  private isQuantityHigherThenQuantityBasket() {
    return this.quantity > this.quantityInBasket;
  }

  get buttonText() {
    return this.quantityInBasket === 0 ? 'Add to basket' : 'Update basket';
  }
}
