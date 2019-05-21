import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {NewTodoComponent} from './new-todo.component';
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

describe('NewTodoComponent', () => {
  let component: NewTodoComponent;
  let fixture: ComponentFixture<NewTodoComponent>;
  let store: TestStore<IAppStore>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NewTodoComponent
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
    fixture = TestBed.createComponent(NewTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
