import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { NewTodoComponent } from './new-todo/new-todo.component';



const routes: Routes = [
  {path: 'todos', component: TodoListComponent},
  {path: 'todos/new', component: NewTodoComponent},

  {path: '**', redirectTo: 'todos'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
