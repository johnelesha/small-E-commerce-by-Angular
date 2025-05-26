import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IUser } from '../../models/iuser';
import { UsersTodosService } from '../../services/users-todos.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser: IUser | null = null;
  showCartDropdown: boolean = false;
  showAccountDropdown: boolean = false;
  private userSubscription: Subscription | undefined;

  constructor(private usersTodosService: UsersTodosService, public cartService: CartService) { }

  ngOnInit() {
    this.currentUser = this.usersTodosService.getCurrentUser();
    this.userSubscription = this.usersTodosService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
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
