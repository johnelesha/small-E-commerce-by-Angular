import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IUser } from '../../models/iuser';
import { UsersTodosService } from '../../services/users-todos.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  currentUser: IUser | null = null;

  constructor(private usersTodosService: UsersTodosService) {
    this.currentUser = this.usersTodosService.getCurrentUser();
  }

  logout() {
    this.usersTodosService.logout();
    this.currentUser = null;
  }
}
