import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
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
import {IAppStore} from './store/store.models';
import {TestStore} from './test-store.test';
import {TodoStateEnum} from './enum/todo-state.enum';
import * as TodoActions from './store/todo/todo.action';
import {RouterTestingModule} from '@angular/router/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: TestStore<IAppStore>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
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
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([Store], (testStore: TestStore<IAppStore>) => {
    store = testStore; // save store reference for use in tests
    store.setState({toDoList: [], authenticationState: {authenticated: false, user: null}}); // set default state
  }));

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should dispatch a GetTodos action', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const todo = {
      id: '1',
      state: TodoStateEnum.done,
      title: '',
      description: '',
      date: new Date('2011-01-10T10:20:30Z')
    };
    component.onAddTodo(todo);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      new TodoActions.AddTodo(todo)
    );
  });
});
