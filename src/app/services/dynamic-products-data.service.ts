import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/iproduct';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DynamicProductsDataService {
  baseURL: string = 'http://localhost:3010/products';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.baseURL);
  }

  getProductById(productId: string | number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseURL}/${productId}`);
  }

  addNewProduct(product: Omit<IProduct, 'id'>): Observable<IProduct> {
    return this.http.post<IProduct>(this.baseURL, product);
  }

  editProduct(productId: string | number, product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.baseURL}/${productId}`, product);
  }

  deleteProduct(productId: string | number): Observable<IProduct> {
    return this.http.delete<IProduct>(`${this.baseURL}/${productId}`);
  }

  updateProductQuantity(productId: string | number, quantity: number): Observable<IProduct> {
    return this.http.patch<IProduct>(`${this.baseURL}/${productId}`, { quantity });
  }
}
