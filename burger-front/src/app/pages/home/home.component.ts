import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/Product.interface';
import { ProductsService } from '../../services/products.service';
import { environment } from '../../../environments/environment.development';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, CapitalizePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  public burgers: Product[] = []
  public s3Url: string = environment.s3url

  private token: any

  constructor(

    private _productService: ProductsService,
    private _cartService: CartService,
    private _userService: UserService

  ){
  
    this.token = _userService.getLocalToken()
    
  }

  ngOnInit(): void {
    this._productService.get().subscribe({
      next: (response: any) => {
        if (parseInt(response.status) == 200) {
          this.burgers = response.data
        }
      }
    })
  }

  onAddcart(id : any): void {
    
    const cart = {
      product_id: id,
      amount: 1
    }

    this._cartService.post(cart,this.token).subscribe({
      next: (response: any) => {
      }
    })
  }

}

