import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/Product.interface';
import { environment } from '../../../environments/environment.development';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmLogComponent } from '../confirm-log/confirm-log.component';
import { ConfirmLogModule } from '../confirm-log/confirm-log.module';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list-dash',
  standalone: true,
  imports: [CommonModule, RouterModule, CapitalizePipe, ConfirmLogModule],
  templateUrl: './list-dash.component.html',
  styleUrl: './list-dash.component.scss'
})
export class ListDashComponent implements OnInit {

  burgers: Product[] = []
  public s3Url: string = environment.s3url
  private token: any 

  constructor(

    private _productsService: ProductsService,
    private dialog: MatDialog,
    private _userService: UserService

  ) {

    this.token = this._userService.getLocalToken()

  }

  ngOnInit(): void {
    this._productsService.get().subscribe({
      next: (response: any) => {
        if (parseInt(response.status) == 200) {
          this.burgers = response.data
        }
      }
    })
  }

  openDialog(id: any): void {
    const dialogRef = this.dialog.open(ConfirmLogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._productsService.delete(id, this.token).subscribe({
          next: (response: any) => {

            if (parseInt(response.status) == 200) {
              
              this._productsService.get().subscribe({
                next: (response: any) => {
                  if (parseInt(response.status) == 200) {
                    this.burgers = response.data
                  }
                }
              })
            }
          }
        })

      }
    });
  }

}
