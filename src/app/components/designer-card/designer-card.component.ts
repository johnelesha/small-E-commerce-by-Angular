import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-designer-card',
  imports: [],
  templateUrl: './designer-card.component.html',
  styleUrl: './designer-card.component.css'
})
export class DesignerCardComponent {
  @Input() designer!: { id: number; name: string; bio: string; image: string };
}
