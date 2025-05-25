import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(
    public cartService: CartService, // Changed to public
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  updateQuantity(productId: number | string, numberOfOrder: number): void {
    this.cartService.updateQuantity(productId, numberOfOrder);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  async checkout(): Promise<void> {
    await this.cartService.checkout();
    alert('Payment successful! Thank you for your purchase.');
    this.router.navigate(['/home']);
  }
}
