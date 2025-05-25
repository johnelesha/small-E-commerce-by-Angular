import { Component } from '@angular/core';
import { DesignerComponent } from '../designer/designer.component';
import { ClothingItemComponent } from '../clothing-item/clothing-item.component';

@Component({
  selector: 'app-shop-main',
  imports: [DesignerComponent, ClothingItemComponent],
  templateUrl: './shop-main.component.html',
  styleUrl: './shop-main.component.css'
})
export class ShopMainComponent {
  designers: { id: number; name: string; itemCount: number; image: string }[] = [
    { id: 1, name: "Claire Vogue", itemCount: 324, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50" },
    { id: 2, name: "Alex Couture", itemCount: 185, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50" },
    { id: 3, name: "Sofia Style", itemCount: 270, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50" },
    { id: 4, name: "Mike Moda", itemCount: 152, image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50" },
    { id: 5, name: "Emma Elegance", itemCount: 298, image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50" },
    { id: 6, name: "Liam Luxe", itemCount: 220, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50" }
  ];

  clothingItems: { id: number; name: string; description: string; price: string; category: string; image: string }[] = [
    { id: 1, name: "Casual Denim Jacket", description: "A versatile denim jacket for everyday wear.", price: "$89.99", category: "Men", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=242" },
    { id: 2, name: "Floral Maxi Dress", description: "Elegant floral dress for summer outings.", price: "$129.99", category: "Women", image: "https://prettykittyfashion.co.uk/cdn/shop/files/3-10.jpg?v=1708007172" },
    { id: 3, name: "Leather Belt", description: "Classic leather belt with a sleek buckle.", price: "$39.99", category: "Accessories", image: "https://www.montblanc.com/variants/images/34480784411797995/A/w2500.jpg" },
    { id: 4, name: "Slim Fit Chinos", description: "Comfortable chinos for a modern look.", price: "$79.99", category: "Men", image: "https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/zoom/519556b9cd88f2dbe7c88427f66f4c72eeb7f036_xxl-1.jpg" },
    { id: 5, name: "Silk Scarf", description: "Luxurious silk scarf for any occasion.", price: "$49.99", category: "Accessories", image: "https://www.cinabre-paris.com/18792/blue-silk-scarf-90-les-marquises-tikiti.jpg" }
  ];
}