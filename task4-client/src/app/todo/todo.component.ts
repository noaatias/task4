import { Component, OnInit, Input } from '@angular/core';
import { Todo } from 'models/todo.model';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo;

  constructor(public store: StoreService) { }

  ngOnInit() {
  }
  onDelete(id:string){
    console.log(this.todo)
    this.store.deleteTodo(id);
    this.store.getTodos();


}
}
