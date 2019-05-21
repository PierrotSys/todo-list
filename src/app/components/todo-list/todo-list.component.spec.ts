import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {TodoListComponent} from './todo-list.component';
import {TodoStateEnum} from '../../enum/todo-state.enum';
import {Todo} from '../../models/todo.model';
import {FormsModule} from '@angular/forms';
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
import {Store} from '@ngrx/store';
import {IAppStore} from '../../store/store.models';
import {TestStore} from '../../test-store.test';
import {TodoListItemComponent} from '../todo-list-item/todo-list-item.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let store: TestStore<IAppStore>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoListItemComponent,
        TodoListComponent
      ],
      imports: [
        RouterTestingModule,
        FormsModule,
        MatButtonModule,
        MatRadioModule,
        MatInputModule,
        MatCardModule,
        MatGridListModule,
        MatListModule,
        MatDialogModule,
        MatProgressBarModule
      ],
      providers: [
        {provide: Store, useClass: TestStore}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([Store], (testStore: TestStore<IAppStore>) => {
    store = testStore; // save store reference for use in tests
    store.setState({toDoList: [], authenticationState: {authenticated: false, user: null}}); // set default state
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort Todo List', () => {
    store.setState({
        toDoList: [], 
        authenticationState: {authenticated: false, user: null}
      }
    );
    const todoList = new Array<Todo>();
    todoList.push({
      id: '1',
      state: TodoStateEnum.done,
      title: '',
      description: '',
      date: new Date('2011-01-10T10:20:30Z')
    });
    todoList.push({
      id: '2',
      state: TodoStateEnum.inProgress,
      title: '',
      description: '',
      date: new Date('2014-01-10T10:20:30Z')
    });
    todoList.push({
      id: '3',
      state: TodoStateEnum.toDo,
      title: '',
      description: '',
      date: new Date('2011-01-10T10:20:30Z')
    });

    expect(component.sortTodos(todoList)[0].id).toEqual('2');
  });
});
