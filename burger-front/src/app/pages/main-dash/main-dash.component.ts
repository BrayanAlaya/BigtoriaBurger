import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { UserService } from '../../services/user.service';
import { ResponseBack } from '../../models/ResponseBack.interface';
import { OrderDetail } from '../../models/OrderDetail.interface';
import { Order } from '../../models/Order,interface';
import { max } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-main-dash',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-dash.component.html',
  styleUrl: './main-dash.component.scss'
})
export class MainDashComponent {

  public ventasHoy: number = 0
  public pedidosHoy: number = 0
  public s3url: string = environment.s3url
  public popularName: any = {
    suma: 0,
    product: "",
  }
  public ordenMayor: number = 0
  public productPopular: OrderDetail[] = []
  public ordenesDesc: any[] = []
  public ordenado: any[] = []

  public orders: OrderDetail[] = []

  constructor(
    private _orderService: OrdersService,
    private _userService: UserService
  ) {
    _orderService.getDash(_userService.getLocalToken()).subscribe({
      next: (response: ResponseBack) => {
        if (response.status) {
          this.orders = response.data ?? []
          
          let suma = response.data?.map(data => data.amount * data.products.price) ?? []
          this.ventasHoy = suma.reduce((sum, num) => sum + num, 0);

          let orderCount: number[] = []
          let orders: number[] = response.data?.map(data => data.orders.id) ?? []
          orders.forEach(d => {
            if (!orderCount.find(num => num === d)) {
              orderCount.push(d)
            };
          });
          this.pedidosHoy = orderCount.length

          let ordersDetail: OrderDetail[] = []
          response.data?.forEach(d => {
            if (!ordersDetail.find(num => num.product_id === d.product_id)) {
              ordersDetail.push(d)
            }
          })

          
          ordersDetail.forEach( d => {

            let suma = 0
            let product = {}

            response.data?.forEach( r => {

              if (d.product_id == r.product_id) {
                
                suma += r.amount 
                product = r.products

              }
              
            })
            if (suma != 0) {
              
              this.ordenesDesc.push({suma:suma , product: product})
            }

            suma = 0

          })
          
          this.popularName = this.ordenesDesc.reduce((max, item) => (item.suma > max.suma ? item : max), this.ordenesDesc[0])
          
          let orderCountmayor: number[] = []
          orderCount?.forEach(d => {
            
            response.data?.forEach(r => {
              if (r.order_id == d) {

                orderCountmayor.push(r.amount * r.products.price)
              }
            })
          });
          this.ordenMayor = Math.max(...orderCountmayor) ;


          this.ordenado = this.ordenesDesc.sort((a, b) => a.suma - b.suma).reverse();

        }
      }
    })
  }

}
