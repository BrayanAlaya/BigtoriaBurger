import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteUserModalModule } from '../delete-user-modal/delete-user-modal.module';
import { DeleteUserModalComponent } from '../delete-user-modal/delete-user-modal.component';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User.intercae';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    MatDialogModule,
    DeleteUserModalModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  public user!: User | null;
  public srcImage: String = "assets/userUnknow.jpg"
  // public s3Url: string = environment.s3url

  

  constructor(
    private _userService: UserService,
    private dialog: MatDialog
  ){

  }

  openDialog(): void{
    this.dialog.open(DeleteUserModalComponent, {
      width: '600px',
      height: '320px'
    });
  }

  ngOnInit(): void {
    this.user = this._userService.getLocalUSer();
  }

}
