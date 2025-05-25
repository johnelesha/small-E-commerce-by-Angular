import { Component } from '@angular/core';
import { DesignerCardComponent } from "../designer-card/designer-card.component";

@Component({
  selector: 'app-featured-designers',
  imports: [DesignerCardComponent],
  templateUrl: './featured-designers.component.html',
  styleUrl: './featured-designers.component.css'
})
export class FeaturedDesignersComponent {
  currentIndex = 0;
  designers = [
    { id: 1, name: "Claire Vogue", bio: "Renowned for bold denim designs and sustainable fashion.", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150" },
    { id: 2, name: "Alex Couture", bio: "Creates elegant evening wear with intricate details.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150" },
    { id: 3, name: "Sofia Style", bio: "Blends modern trends with timeless classics.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150" },
    { id: 4, name: "Mike Moda", bio: "Specializes in minimalist menswear collections.", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150" },
    { id: 5, name: "Emma Elegance", bio: "Known for luxurious accessories and bold patterns.", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150" },
    { id: 6, name: "Liam Luxe", bio: "Innovates with eco-friendly streetwear designs.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150" }
  ];
  maxIndex = this.designers.length - 3;

  prevCard() {
    if (this.currentIndex > 0) this.currentIndex--;
  }

  nextCard() {
    if (this.currentIndex < this.maxIndex) this.currentIndex++;
  }
}