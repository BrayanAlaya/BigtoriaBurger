import { CommonModule } from '@angular/common';
import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Cart } from '../../models/Cart.interface';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { PayComponent } from '../pay/pay.component';
import { ConfirmLogComponent } from '../confirm-log/confirm-log.component';
import { Order } from '../../models/Order,interface';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-vender',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, MatIcon, CapitalizePipe],
  templateUrl: './vender.component.html',
  styleUrl: './vender.component.scss'
})
export class VenderComponent implements DoCheck, OnInit {
  public deliveryAddress = '';
  public emptyCart = true
  private token: any
  public total = 0;
  public hasAddress = false;
  public carts: Cart[] = [];

  constructor(
    private _cartService: CartService,
    private _userService: UserService,
    private _orderService: OrdersService,
    private dialog: MatDialog
  ) {
    this.token = this._userService.getLocalToken()
  }

  ngDoCheck(): void {
    this.hasAddress = this.deliveryAddress.length > 0 ? true : false
  }
  ngOnInit(): void {
    this.init()
  }

  init() {
    this._cartService.get(this.token).subscribe({
      next: (response: any) => {
        if (parseInt(response.status) == 200) {
          let newcarts: Cart[] = []
          let newtotal = 0

          response.data.forEach((data: Cart) => {
            newcarts.push(data)
            newtotal += data.amount * data.products.price
          });

          this.carts = newcarts;
          this.total = newtotal

          if (this.carts.length <= 0) {
            this.emptyCart = true
          } else {
            this.emptyCart = false
          }

        } else {

        }
      }
    })
  }

  substract(id: any): void {
    const cart = {
      product_id: id,
      amount: -1
    }

    this._cartService.post(cart, this.token).subscribe({
      next: (r) => {
        if (parseInt(r.status) == 200) {
          this.init()
        }
      }
    })
  }
  add(id: any): void {

    const cart = {
      product_id: id,
      amount: 1
    }

    this._cartService.post(cart, this.token).subscribe({
      next: (r: any) => {
        console.log(r);

        if (parseInt(r.status) == 200) {
          this.init()
        }
      }
    })
  }

  removeItem(id: string | number): void {
    this._cartService.delete(id, this.token).subscribe({
      next: (response: any) => {

        this.init()

      }
    })
  }

  placeOrder() {
    const dialogRef = this.dialog.open(PayComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result?.state) {
        const order: Order = {
          id: 0,
          date: "",
          method: result.message,
          user_id: 0,
          address: this.deliveryAddress,
          users: {
            name: ""
          }
        }

        this._orderService.post(order, this.token).subscribe({
          next: (response: any) => {
            this.init()
          }
        })
      }
    });
  }
}
