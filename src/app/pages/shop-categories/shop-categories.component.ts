import { Component } from '@angular/core';
import { CategoryFilterComponent } from "../../components/category-filter/category-filter.component";
import { CategoryCardComponent } from "../../components/category-card/category-card.component";

@Component({
  selector: 'app-shop-categories',
  imports: [CategoryFilterComponent, CategoryCardComponent],
  templateUrl: './shop-categories.component.html',
  styleUrl: './shop-categories.component.css'
})
export class ShopCategoriesComponent {
  department: string = 'All';
  categories: { id: number; name: string; department: string }[];
  filteredCategories: { id: number; name: string; department: string }[];

  constructor() {
    this.categories = [
      { id: 1, name: "Casual Shirts", department: "Men" },
      { id: 2, name: "Dresses", department: "Women" },
      { id: 3, name: "Watches", department: "Accessories" },
      { id: 4, name: "Formal Trousers", department: "Men" },
      { id: 5, name: "Handbags", department: "Accessories" },
      { id: 6, name: "Blouses", department: "Women" },
      { id: 7, name: "Sneakers", department: "Men" },
      { id: 8, name: "Scarves", department: "Accessories" },
      { id: 9, name: "Skirts", department: "Women" },
      { id: 10, name: "Belts", department: "Accessories" },
      { id: 11, name: "Jackets", department: "Men" },
      { id: 12, name: "Tops", department: "Women" },
      { id: 13, name: "Sunglasses", department: "Accessories" },
      { id: 14, name: "Jeans", department: "Men" },
      { id: 15, name: "Sweaters", department: "Women" },
    ];
    this.filteredCategories = this.categories;
  }

  onDepartmentSelected(department: string) {
    this.department = department;
    this.filteredCategories =
      this.department === 'All'
        ? this.categories
        : this.categories.filter(
          (category) =>
            category.department.toLowerCase() === this.department.toLowerCase()
        );
  }
}