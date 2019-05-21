import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {TodoListItemComponent} from './todo-list-item.component';
import {TestStore} from '../../test-store.test';
import {IAppStore} from '../../store/store.models';
import {RouterTestingModule} from '@angular/router/testing';
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
import {TodoStateEnum} from '../../enum/todo-state.enum';
import {Component} from '@angular/core';

describe('TodoListItemComponent', () => {
  let component: TodoListItemComponent;
  let fixture: ComponentFixture<TestComponentWrapperComponent>;
  let store: TestStore<IAppStore>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponentWrapperComponent,
        TodoListItemComponent
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

  beforeEach(inject([Store], (testStore: TestStore<IAppStore>) => {
    store = testStore; // save store reference for use in tests
    store.setState({toDoList: [], authenticationState: {authenticated: false, user: null}}); // set default state
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapperComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check the done state of Todo', () => {
    expect(component.todoIsDone(component.todo)).toEqual(true);
    component.todo.state = TodoStateEnum.toDo;
    expect(component.todoIsDone(component.todo)).toEqual(false);
  });

  it('should return the correct footer class', () => {
    component.todo.state = TodoStateEnum.toDo;
    expect(component.getTodoFooterClass(component.todo)).toEqual(['footer-0']);
    component.todo.state = TodoStateEnum.inProgress;
    expect(component.getTodoFooterClass(component.todo)).toEqual(['footer-50']);
    component.todo.state = TodoStateEnum.done;
    expect(component.getTodoFooterClass(component.todo)).toEqual(['footer-100']);
  });
});

@Component({
  selector: 'app-test-component-wrapper',
  template: '<app-todo-list-item [todo]="todo"></app-todo-list-item>'
})
class TestComponentWrapperComponent {
  todo = {
    id: '3',
    state: TodoStateEnum.done,
    title: '',
    description: '',
    date: new Date('2011-01-10T10:20:30Z')
  };
}
