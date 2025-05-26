import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { IUser } from '../models/iuser';
import { ITodo } from '../models/itodo';

@Injectable({
  providedIn: 'root'
})
export class UsersTodosService {
  apiUrl: string = 'http://localhost:3010/users';

  private currentUserSubject = new BehaviorSubject<IUser | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  setCurrentUser(user: IUser): void {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): IUser | null {
    return this.currentUserSubject.value;
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
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