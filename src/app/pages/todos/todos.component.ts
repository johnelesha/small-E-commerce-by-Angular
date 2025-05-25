import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersTodosService } from '../../services/users-todos.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ITodo } from '../../models/itodo';
import { IUser } from '../../models/iuser';
import { TodoTableComponent } from "../../components/todo-table/todo-table.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todos',
  imports: [FormsModule, CommonModule, RouterLink, TodoTableComponent],
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit, OnDestroy {
  todoInput: string = '';
  todos: ITodo[] = [];
  currentUser: IUser | null = null;
  private userSubscription?: Subscription;

  constructor(private userTodosService: UsersTodosService) {}
  
  ngOnInit(): void {
    this.currentUser = this.userTodosService.getCurrentUser();
    if (this.currentUser) {
      this.todos = this.currentUser.todos || [];
    }
    this.userSubscription = this.userTodosService.userChanged$.subscribe(user => {
      this.currentUser = user;
      this.todos = user?.todos || [];
    });
  }
  
  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  logout() {
    this.userTodosService.logout();
    this.currentUser = null;
    this.todos = [];
  }

  addTodo() {
    if (!this.todoInput.trim()) return;

    const newTodo: ITodo = {
      task: this.todoInput.trim(),
      completed: false
    };

    this.userTodosService.addTodoToUser(newTodo).subscribe({
      next: (updatedUser) => {
        this.currentUser = updatedUser;
        this.todos = updatedUser.todos;
        this.todoInput = '';
      },
      error: (err) => {
        console.error('Error adding todo:', err);
      }
    });
  }

  removeTodo(index: number) {
    this.userTodosService.deleteUserTodo(index).subscribe({
      next: (updatedUser) => {
        this.currentUser = updatedUser;
        this.todos = updatedUser.todos;
      },
      error: (err) => {
        console.error('Error removing todo:', err);
      }
    });
  }

  completeTodo(index: number) {
    const updatedTodo = {
      ...this.todos[index],
      completed: !this.todos[index].completed
    };

    this.userTodosService.updateUserTodo(index, updatedTodo).subscribe({
      next: (updatedUser) => {
        this.currentUser = updatedUser;
        this.todos = updatedUser.todos;
      },
      error: (err) => {
        console.error('Error updating todo:', err);
      }
    });
  }

}