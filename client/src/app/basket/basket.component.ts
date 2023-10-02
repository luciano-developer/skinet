import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket.service';
import { BehaviorSubject } from 'rxjs';
import { IBasket, IBasketItem } from '../shared/models/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {


  constructor(public basketService: BasketService) {

  }

  ngOnInit(): void {
    const basketId = localStorage.getItem('basket_id');
    this.basketService.getBasket(basketId);
  }

  incrementQuantity(item: IBasketItem) {
    this.basketService.addItemToBasket(item);
  }

  removeItem(id: number, quantity = 1) {
    this.basketService.removeItemFromBasket(id, quantity);
  }
}
