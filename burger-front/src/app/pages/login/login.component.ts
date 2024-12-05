import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User.intercae';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  errorMessage = 'adadaa';

  public user: User = {name : ""}
  public userForm!: FormGroup

  public buttonValid: boolean = false
  public fail: boolean = false

  constructor(
    private _userService: UserService,
    private _fb: FormBuilder,
    private _r: Router

  ) {

    this.initForm()
  }

  ngOnInit(): void {
    if (this._userService.getLocalUSer()) {
      this._r.navigate(["/"])
    }
  }

  private initForm() {
    this.userForm = this._fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.errorMessage = 'Invalid username or password';
      return;
    }
    this.errorMessage = '';
    this.fail = false
    this.buttonValid = true

    this._userService.login(this.userForm.value).subscribe({
      next: (response: any) => {
        if (response.status == 200) {

          localStorage.setItem("user", JSON.stringify(response.data))
          localStorage.setItem("token", response.token)

          this._r.navigate(["/"])

        } else {
          this.fail = true
          this.errorMessage = "Hubo un error!"
          this.buttonValid = false
        }
      }
    })
  }
}
