import { Component, OnInit, TemplateRef } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasketItem } from 'src/app/shared/models/basket';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(
    public basketService: BasketService,
    public accountService: AccountService,
    private offcanvasService: NgbOffcanvas
  ) {}

  ngOnInit(): void {}

  getCount(items: IBasketItem[]) {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }

  logout() {
    this.accountService.logout();
  }

  viewOrders(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' });
  }
}
