import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DynamicProductsDataService } from '../../services/dynamic-products-data.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  productData: IProduct | undefined;
  isLoading: boolean = true;
  showAddedMessage: boolean = false;
  addCount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: DynamicProductsDataService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');

    if (!productId) {
      this.isLoading = false;
      return;
    }

    const id = isNaN(Number(productId)) ? productId : Number(productId);

    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.productData = product;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  addToCart(): void {
    if (this.productData) {
      const added = this.cartService.addToCart(this.productData);
      if (added) {
        this.showAddedMessage = true;
        this.addCount++;
        setTimeout(() => {
          this.showAddedMessage = false;
        }, 1500);
      }
    }
  }
}