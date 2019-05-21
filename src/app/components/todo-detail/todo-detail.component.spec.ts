import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {TodoDetailComponent} from './todo-detail.component';
import {TestStore} from '../../test-store.test';
import {IAppStore} from '../../store/store.models';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
import {TodoStateEnum} from '../../enum/todo-state.enum';
import * as TodoActions from '../../store/todo/todo.action';

describe('TodoDetailComponent', () => {
  let component: TodoDetailComponent;
  let fixture: ComponentFixture<TodoDetailComponent>;
  let store: TestStore<IAppStore>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoDetailComponent
      ],
      imports: [
        RouterTestingModule,
        FormsModule,
        BrowserAnimationsModule,
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

  beforeEach(inject([Store], (testStore: TestStore<IAppStore>) => {
    store = testStore; // save store reference for use in tests
    store.setState({toDoList: [], authenticationState: {authenticated: false, user: null}}); // set default state
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch a DeleteTodo action', () => {
    const todo = {
      id: '1',
      state: TodoStateEnum.done,
      title: '',
      description: '',
      date: new Date('2011-01-10T10:20:30Z')
    };
    const dispatchSpy = spyOn(store, 'dispatch');

    component.deleteTodo(todo);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      new TodoActions.DeleteTodo(todo)
    );
  });

  it('should dispatch a UpdateTodo action', () => {
    const todo = {
      id: '1',
      state: TodoStateEnum.done,
      title: '',
      description: '',
      date: new Date('2011-01-10T10:20:30Z')
    };
    const dispatchSpy = spyOn(store, 'dispatch');

    component.editTodo(todo);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      new TodoActions.UpdateTodo(todo)
    );
    expect(component.editMode).toEqual(false);
  });

  it('should set editMode On', () => {
    component.editMode = false;
    expect(component.editMode).toEqual(false);
    component.switchEditModeOn();
    expect(component.editMode).toEqual(true);
  });
});
