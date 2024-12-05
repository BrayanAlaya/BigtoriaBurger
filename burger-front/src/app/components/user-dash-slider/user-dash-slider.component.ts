import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-dash-slider',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-dash-slider.component.html',
  styleUrl: './user-dash-slider.component.scss'
})
export class UserDashSliderComponent {
  isCollapsed = true;
  activeItem = 'view';

  touched = false

  menuItems = [
    { id: 'admin', icon: '🏠', label: 'Inicio', path: "/user"},
    { id: 'historial', icon: '⌚', label: 'Historial', path: "/user/buy-story"},
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.touched = true;
  }

}
