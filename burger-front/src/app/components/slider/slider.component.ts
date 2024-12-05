import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  isCollapsed = true;
  activeItem = 'view';

  touched = false

  menuItems = [
    { id: 'admin', icon: '🏠', label: 'Inicio', path: "/dash"},
    { id: 'create', icon: '➕', label: 'Crear', path: "/dash/create"},
    { id: 'list', icon: '🍔', label: 'Lista', path: "/dash/list" },
    { id: 'sales', icon: '📊', label: 'Ventas', path: "/dash/sales"},
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.touched = true;
  }

}
