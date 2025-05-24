import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IUser } from '../models/iuser';
import { ITodo } from '../models/itodo';

@Injectable({
  providedIn: 'root'
})
export class UsersTodosService {
  apiUrl: string = 'http://localhost:3010/users';

  private currentUser: IUser | null = null;
  userChanged$ = new EventEmitter<IUser | null>();

  constructor(private http: HttpClient) { }

  setCurrentUser(user: IUser): void {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.userChanged$.emit(user);
  }

  getCurrentUser(): IUser | null {
    if (!this.currentUser) {
      const user = localStorage.getItem('currentUser');
      if (user) {
        this.currentUser = JSON.parse(user);
      }
    }
    return this.currentUser;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.userChanged$.emit(null);
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.apiUrl}`);
  }

  getUserById(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/${id}`);
  }

  addUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}`, user);
  }

  addTodoToUser(todo: ITodo): Observable<IUser> {
    const user = this.getCurrentUser();
    if (!user) {
      throw new Error('No user logged in');
    }

    const updatedTodos = [...user.todos, todo];
    return this.http.patch<IUser>(`${this.apiUrl}/${user.id}`, {
      todos: updatedTodos
    }).pipe(
      map(updatedUser => {
        this.setCurrentUser(updatedUser);
        return updatedUser;
      })
    );
  }

  updateUserTodo(todoIndex: number, updatedTodo: ITodo): Observable<IUser> {
    const user = this.getCurrentUser();
    if (!user) {
      throw new Error('No user logged in');
    }

    const currentTodos = [...user.todos];
    currentTodos[todoIndex] = updatedTodo;
    return this.http.patch<IUser>(`${this.apiUrl}/${user.id}`, {
      todos: currentTodos
    }).pipe(
      map(updatedUser => {
        this.setCurrentUser(updatedUser);
        return updatedUser;
      })
    );
  }

  deleteUserTodo(todoIndex: number): Observable<IUser> {
    const user = this.getCurrentUser();
    if (!user) {
      throw new Error('No user logged in');
    }

    const currentTodos = [...user.todos];
    currentTodos.splice(todoIndex, 1);
    return this.http.patch<IUser>(`${this.apiUrl}/${user.id}`, {
      todos: currentTodos
    }).pipe(
      map(updatedUser => {
        this.setCurrentUser(updatedUser);
        return updatedUser;
      })
    );
  }
}