import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { OrdersService } from '../../services/orders.service';
import { OrderDetail } from '../../models/OrderDetail.interface';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';

@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [FormsModule, CommonModule, CapitalizePipe],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.scss'
})
export class BuyComponent {
  allSales: OrderDetail[] = [];

  constructor(
    private _orderService: OrdersService,
    private _userService: UserService
  ){

  }

  ngOnInit() {
    this.init();
  }

  init(): void {
    this._orderService.get(this._userService.getLocalToken()).subscribe({
      next: (response : any) => {
        
        if (parseInt(response.status) == 200) {
          this.allSales = response.data
        }
        
      }
    })
  }
}
