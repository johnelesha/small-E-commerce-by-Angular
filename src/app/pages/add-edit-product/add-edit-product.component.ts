import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DynamicProductsDataService } from '../../services/dynamic-products-data.service';
import { IProduct } from '../../models/iproduct';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-edit-product',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css'
})
export class AddEditProductComponent implements OnInit {
  isEditMode = false;
  productId!: string | number | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: DynamicProductsDataService
  ) { }

  productForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl<string>('', [Validators.required, Validators.minLength(10)]),
    price: new FormControl<number>(15, [Validators.required, Validators.min(15), Validators.max(500)]),
    quantity: new FormControl<number>(1, [Validators.required, Validators.min(1)]),
    category: new FormControl<string>('Men', Validators.required),
    size: new FormControl<string>('S', Validators.required),
    image: new FormControl<string>('', [Validators.pattern(/^(http|https):\/\/[^\s]+$/)])
  });

  get getName() {
    return this.productForm.controls["name"];
  }

  get getDescription() {
    return this.productForm.controls["description"];
  }

  get getPrice() {
    return this.productForm.controls["price"];
  }

  get getQuantity() {
    return this.productForm.controls["quantity"];
  }

  get getCategory() {
    return this.productForm.controls["category"];
  }

  get getSize() {
    return this.productForm.controls["size"];
  }

  get getImage() {
    return this.productForm.controls["image"];
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.productId = idParam ? (isNaN(Number(idParam)) ? idParam : Number(idParam)) : null;
    this.isEditMode = !!this.productId;

    if (this.isEditMode && this.productId) {
      this.productService.getProductById(this.productId).subscribe({
        next: (existingProduct) => {
          this.productForm.patchValue({
            name: existingProduct.name,
            description: existingProduct.description,
            price: existingProduct.price,
            quantity: existingProduct.quantity,
            category: existingProduct.category,
            size: existingProduct.size,
            image: existingProduct.image
          });
        },
        error: () => {
          alert('Failed to load product');
        }
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    const formValue = this.productForm.value;

    const tempId = 'temp-' + Date.now();

    const product: IProduct = {
      id: this.isEditMode && this.productId ? this.productId : tempId,
      name: formValue.name!,
      description: formValue.description!,
      price: Number(formValue.price),
      quantity: Number(formValue.quantity),
      category: formValue.category!,
      size: formValue.size!,
      image: formValue.image || 'https://via.placeholder.com/300'
    };

    const operation = this.isEditMode && this.productId
      ? this.productService.editProduct(this.productId, product)
      : this.productService.addNewProduct(product);

    operation.subscribe({
      next: () => this.router.navigate(['/products']),
      error: () => alert(`Failed to ${this.isEditMode ? 'update' : 'add'} product`)
    });
  }
}
