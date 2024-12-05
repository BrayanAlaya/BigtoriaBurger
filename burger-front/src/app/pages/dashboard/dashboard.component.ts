import { Component } from '@angular/core';
import { SliderComponent } from "../../components/slider/slider.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [SliderComponent, RouterOutlet]
})
export class DashboardComponent {
  
}
