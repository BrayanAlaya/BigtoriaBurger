import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserDashSliderComponent } from '../../components/user-dash-slider/user-dash-slider.component';

@Component({
  selector: 'app-user-dash',
  standalone: true,
  imports: [RouterOutlet, UserDashSliderComponent],
  templateUrl: './user-dash.component.html',
  styleUrl: './user-dash.component.scss'
})
export class UserDashComponent {

}
