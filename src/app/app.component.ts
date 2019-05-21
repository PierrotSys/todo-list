import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppStore } from './store/store.models';
import * as TodoActions from './store/todo/todo.action';
import * as UserActions from './store/user/user.action';
import { NewTodoComponent } from './components/new-todo/new-todo.component';
import { MatDialog } from '@angular/material';
import { UserProfileEnum } from './enum/user-profile.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<IAppStore>, private dialog: MatDialog) {}

  ngOnInit() {
    this.store.dispatch(new TodoActions.GetTodos());

    // simulating authentication
    this.onUserAuthenticated('currentUser');
    //this.onUserAuthenticated('otherUser');
  }

  /**
   * Open "Add new task" dialog
   */
  openCreateDialog(): void {
    const dialogRef = this.dialog.open(NewTodoComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onAddTodo(result);
      }
    });
  }

  /**
   * Add new task to store
   */
  onAddTodo(newTodo) {
    this.store.dispatch(new TodoActions.AddTodo(newTodo));
  }

  /**
   * Reference authenticated user to store
   */
  onUserAuthenticated(user) {
    this.store.dispatch(new UserActions.AuthenticateAction(user));
  }
}
