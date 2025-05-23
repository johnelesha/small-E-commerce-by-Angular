import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-size-category',
  imports: [FormsModule, CommonModule],
  templateUrl: './size-category.component.html',
  styleUrl: './size-category.component.css'
})
export class SizeCategoryComponent implements OnInit {
  categories: string[] = ['all', 'men', 'women'];
  sizes: string[] = ['all', 'S', 'M', 'L', 'XL'];

  selectedCategory: string = 'all';
  selectedSize: string = 'all';
  @Output() filterChange = new EventEmitter<{ category: string; size: string }>();

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['category'] || 'all';
      this.selectedSize = params['size'] || 'all';
    });
  }

  applyFilters() {
    this.filterChange.emit({
      category: this.selectedCategory,
      size: this.selectedSize
    });
  }
}
