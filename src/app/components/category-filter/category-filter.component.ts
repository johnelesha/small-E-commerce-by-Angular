import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-filter',
  imports: [FormsModule],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.css'
})
export class CategoryFilterComponent {
  selectedDepartment: string = 'All';
  @Output() departmentSelected = new EventEmitter<string>();

  onDepartmentChange() {
    this.departmentSelected.emit(this.selectedDepartment);
  }
}
