import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IUser } from '../models/iuser';
import { UsersTodosService } from './users-todos.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3010/users';

  constructor(
    private http: HttpClient,
    private userTodosService: UsersTodosService
  ) { }

  login(email: string, password: string): Observable<IUser> {
    return this.http.get<IUser[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map(users => {
        if (users.length > 0) {
          this.userTodosService.setCurrentUser(users[0]);
          return users[0];
        }
        throw new Error('Invalid credentials');
      })
    );
  }

  register(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.apiUrl, user).pipe(
      map(newUser => {
        return newUser;
      })
    );
  }

  logout(): void {
    this.userTodosService.logout();
  }

  isAuthenticated(): boolean {
    return this.userTodosService.getCurrentUser() !== null;
  }
}