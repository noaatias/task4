import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from 'models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private httpClient: HttpClient) { }

  getTodoListFromServer(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(`http://localhost:3000/task/`);
}
addTodoToServer(todo: Todo): Observable<Todo> {
  return this.httpClient.post<Todo>(`http://localhost:3000/task/`, todo);
}
}
