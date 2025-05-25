import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IUser } from '../../models/iuser';
import { UsersTodosService } from '../../services/users-todos.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  currentUser: IUser | null = null;
  showCartDropdown: boolean = false;
  showAccountDropdown: boolean = false;
  
  constructor(private usersTodosService: UsersTodosService, public cartService: CartService) {
    this.currentUser = this.usersTodosService.getCurrentUser();
  }

  logout() {
    this.usersTodosService.logout();
    this.currentUser = null;
  }

  toggleCartDropdown(): void {
    this.showCartDropdown = !this.showCartDropdown;
  }

  toggleAccountDropdown(): void {
    this.showAccountDropdown = !this.showAccountDropdown;
    if (this.showAccountDropdown) {
      this.showCartDropdown = false;
    }
  }
}
