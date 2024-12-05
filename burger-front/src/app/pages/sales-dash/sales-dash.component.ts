import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderDetail } from '../../models/OrderDetail.interface';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { OrdersService } from '../../services/orders.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sales-dash',
  standalone: true,
  imports: [FormsModule, CommonModule, CapitalizePipe],
  templateUrl: './sales-dash.component.html',
  styleUrl: './sales-dash.component.scss'
})
export class SalesDashComponent {
  
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
    this._orderService.getSales(this._userService.getLocalToken()).subscribe({
      next: (response : any) => {
        
        if (parseInt(response.status) == 200) {
          this.allSales = response.data
        }
        
      }
    })
  }
}
