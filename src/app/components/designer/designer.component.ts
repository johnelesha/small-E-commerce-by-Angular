import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-designer',
  imports: [CommonModule],
  templateUrl: './designer.component.html',
  styleUrl: './designer.component.css'
})
export class DesignerComponent {
  @Input() designer!: { id: number; name: string; itemCount: number; image: string };
}
