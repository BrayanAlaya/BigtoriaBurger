import { Component, DoCheck, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User.intercae';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MatIconModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, DoCheck {

  public user: User | null = null

  public dash: string = ""

  constructor(

    private _userService: UserService

  ) {

  }

  ngDoCheck(): void {
      
    this.user = this._userService.getLocalUSer()
    if (this.user) {
      if (this.user.role == "user") {
        this.dash = "user"
      } else if (this.user.role == "admin"){
        this.dash = "dash"
      }
    }

  }

  ngOnInit(): void {
  }

  logout(): void {
    this._userService.closeSesion()
  }

}
