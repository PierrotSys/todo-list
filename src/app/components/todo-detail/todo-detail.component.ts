import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {IAppStore} from '../../store/store.models';
import {Todo} from '../../models/todo.model';
import * as TodoActions from '../../store/todo/todo.action';
import {Observable} from 'rxjs';
import * as selectors from '../../store/todo/todo.selectors';
import {RouterService} from '../../services/router.service';
import {TodoStateEnum} from '../../enum/todo-state.enum';
import { AuthorizationManagerService } from 'src/app/services/authorization-manager.service';
import { RightEnum } from 'src/app/enum/authorization.enum';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {

  id: string;
  todo: Observable<Todo>;
  editMode: boolean;
  todoStateEnum = TodoStateEnum;
  
  showStateRadioButtons = false;
  showDeleteButton = false;

  constructor(private route: ActivatedRoute,
              private store: Store<IAppStore>,
              private routerService: RouterService,
              private authorizationManagerService: AuthorizationManagerService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.store.subscribe((state) => {
      if (state.toDoList) {
        this.todo = this.store.pipe(select(selectors.getItemById(this.id)));
      }
    });
    this.editMode = false;
    // check user rights
    this.authorizationManagerService.hasRight(RightEnum.TODO_TODOLIST_U_STATE).then((val) => this.showStateRadioButtons = val);
    this.authorizationManagerService.hasRight(RightEnum.TODO_TODOLIST_D).then((val) => this.showDeleteButton = val);
  }

  /**
   * Go back to list screen
   */
  goBack() {
    this.routerService.goTo('');
  }

  /**
   * Put on switch mode for dezcription
   */
  switchEditModeOn() {
    this.editMode = true;
  }

  /**
   * Update todo in store
   */
  editTodo(todo) {
    this.store.dispatch(new TodoActions.UpdateTodo(todo));
    this.editMode = false;
  }

  /**
   * Delete todo from store and go back to list screen
   */
  deleteTodo(todo) {
    this.store.dispatch(new TodoActions.DeleteTodo(todo));
    this.goBack();
  }

}
