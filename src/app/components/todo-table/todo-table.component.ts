import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodo } from '../../models/itodo';

@Component({
  selector: 'app-todo-table',
  imports: [],
  templateUrl: './todo-table.component.html',
  styleUrl: './todo-table.component.css'
})
export class TodoTableComponent {
  @Input() todos: ITodo[] = [];
  @Output() complete = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  onComplete(index: number) {
    this.complete.emit(index);
  }

  onRemove(index: number) {
    this.remove.emit(index);
  }
}
