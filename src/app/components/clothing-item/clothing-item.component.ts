import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-clothing-item',
  imports: [],
  templateUrl: './clothing-item.component.html',
  styleUrl: './clothing-item.component.css'
})
export class ClothingItemComponent {
  @Input() item!: { id: number; name: string; description: string; price: string; category: string; image: string };
}
