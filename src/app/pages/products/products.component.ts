import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { ProductCardComponent } from "./product-card/product-card.component";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SizeCategoryComponent } from "./size-category/size-category.component";
import { IProduct } from '../../models/iproduct';
import { DynamicProductsDataService } from '../../services/dynamic-products-data.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule, SearchBarComponent, ProductCardComponent, RouterLink, SizeCategoryComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private productsService: DynamicProductsDataService) { }

  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  currentSearchTerm: string = '';

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;

        this.route.queryParams.subscribe(params => {
          this.currentSearchTerm = params['search'] || '';
          this.applyFilters(
            this.currentSearchTerm,
            params['category'] || 'all',
            params['size'] || 'all'
          );
        });
      },
      error: (err) => console.error(err)
    });
  }

  handleSearch(term: string) {
    this.currentSearchTerm = term;
    const params = this.route.snapshot.queryParams;
    this.applyFilters(term, params['category'] || 'all', params['size'] || 'all');
  }

  handleFilterChange(filter: { category: string, size: string }) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        category: filter.category !== 'all' ? filter.category : null,
        size: filter.size !== 'all' ? filter.size : null
      },
      queryParamsHandling: 'merge'
    });
  }

  applyFilters(term: string, category: string, size: string) {
    this.filteredProducts = this.products.filter(p => {
      const matchesCategory = category === 'all' || p.category.toLowerCase() === category.toLowerCase();
      const matchesSize = size === 'all' ||
        (Array.isArray(p.size) ? p.size.includes(size) :
          p.size.toLowerCase().includes(size.toLowerCase()));
      const matchesSearch = term === '' || p.name.toLowerCase().includes(term.toLowerCase());

      return matchesCategory && matchesSize && matchesSearch;
    });
  }

  handleDelete(productId: string) {
  this.productsService.deleteProduct(productId).subscribe({
    next: (deletedProduct) => {
      this.products = this.products.filter(p => p.id !== deletedProduct.id);
      const params = this.route.snapshot.queryParams;
      this.applyFilters(
        this.currentSearchTerm,
        params['category'] || 'all',
        params['size'] || 'all'
      );
    },
    error: (err) => {
      alert(err.error);
    }
  });
}
}
