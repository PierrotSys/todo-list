import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {reducers} from './store/reducers.models';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatGridListModule,
  MatInputModule,
  MatListModule,
  MatProgressBarModule,
  MatRadioModule
} from '@angular/material';
import {INITIAL_STATE} from './store/store.models';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NewTodoComponent} from './components/new-todo/new-todo.component';
import {TodoListItemComponent} from './components/todo-list-item/todo-list-item.component';
import {TodoListComponent} from './components/todo-list/todo-list.component';
import {TodoDetailComponent} from './components/todo-detail/todo-detail.component';
import {TodoEffects} from './store/todo/todo.effects';
import {EffectsModule} from '@ngrx/effects';
import {HttpClientModule} from '@angular/common/http';
import {mockedBackendProvider} from './interceptor/mocked-backend-interceptor.service';
import { UserService } from './services/user.service';
import { AuthorizationManagerService } from './services/authorization-manager.service';
import { UserEffects } from './store/user/user.effects';

const appRoutes: Routes = [
  {
    path: '',
    component: TodoListComponent
  },
  {
    path: 'todo/:id',
    component: TodoDetailComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NewTodoComponent,
    TodoListItemComponent,
    TodoListComponent,
    TodoDetailComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatRadioModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatDialogModule,
    MatProgressBarModule,
    StoreModule.forRoot(reducers, {initialState: INITIAL_STATE}),
    EffectsModule.forRoot([TodoEffects, UserEffects])
  ],
  providers: [mockedBackendProvider, UserService, AuthorizationManagerService],
  bootstrap: [AppComponent],
  entryComponents: [NewTodoComponent]
})
export class AppModule {
}
