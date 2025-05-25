import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item';
import { DynamicProductsDataService } from './dynamic-products-data.service';
import { IProduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private productService: DynamicProductsDataService) { }

  addToCart(product: IProduct): boolean {
    if (product.quantity === 0) {
      return false;
    }

    const currentItems = this.cartItemsSubject.getValue();
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      if (existingItem.numberOfOrder < product.quantity) {
        existingItem.numberOfOrder++;
      } else {
        return false;
      }
    } else {
      currentItems.push({ product, numberOfOrder: 1 });
    }

    this.cartItemsSubject.next([...currentItems]);
    return true;
  }

  removeFromCart(productId: number | string): void {
    const currentItems = this.cartItemsSubject.getValue();
    const updatedItems = currentItems.filter(item => item.product.id !== productId);
    this.cartItemsSubject.next(updatedItems);
  }

  updateQuantity(productId: number | string, numberOfOrder: number): void {
    const currentItems = this.cartItemsSubject.getValue();
    const item = currentItems.find(item => item.product.id === productId);
    if (item && numberOfOrder <= item.product.quantity && numberOfOrder > 0) {
      item.numberOfOrder = numberOfOrder;
      this.cartItemsSubject.next([...currentItems]);
    }
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.getValue();
  }

  getTotalItems(): number {
    return this.cartItemsSubject.getValue().reduce((total, item) => total + item.numberOfOrder, 0);
  }

  getTotalPrice(): number {
    return this.cartItemsSubject.getValue().reduce((total, item) => total + (item.product.price * item.numberOfOrder), 0);
  }

  checkout(): Promise<void> {
    const currentItems = this.cartItemsSubject.getValue();
    const updatePromises = currentItems.map(item => {
      const newQuantity = item.product.quantity - item.numberOfOrder;
      return this.productService.updateProductQuantity(item.product.id, newQuantity).toPromise();
    });

    return Promise.all(updatePromises).then(() => {
      this.clearCart();
    });
  }
}
