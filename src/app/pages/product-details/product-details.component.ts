import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DynamicProductsDataService } from '../../services/dynamic-products-data.service';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  productData: IProduct | undefined;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private productService: DynamicProductsDataService
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    console.log(productId);
    
    if (!productId) {
      this.isLoading = false;
      return;
    }

    const id = isNaN(Number(productId)) ? productId : Number(productId);

    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.productData = product;
        this.isLoading = false;
        console.log(this.productData);
        console.log(product);
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

}