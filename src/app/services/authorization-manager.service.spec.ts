import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { AuthorizationManagerService } from './authorization-manager.service';
import {Store} from '@ngrx/store';
import { TestStore } from '../test-store.test';
import { IAppStore } from '../store/store.models';

describe('AutorizationManagerService', () => {
  let store: TestStore<IAppStore>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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

  it('should be created', () => {
    const service: AuthorizationManagerService = TestBed.get(AuthorizationManagerService);
    expect(service).toBeTruthy();
  });
});
