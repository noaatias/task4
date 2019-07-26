import { Component, OnInit } from '@angular/core';

import {StoreService} from '../store.service';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent implements OnInit {
  constructor(private store: StoreService, private fb: FormBuilder, private router: Router) {
  }

  todoForm = this.fb.group({
    descriptionOfTask: ['', Validators.required],
    name: ['', Validators.required],
    
  });



  ngOnInit() {
    this.store.getMembers();
  }

  submitTodo() {
    console.log(this.todoForm.value)
    const newtodoForm={...this.todoForm.value,date:new Date(Date.now())}
    console.log(newtodoForm)

    this.store.addTodo(newtodoForm).add(() => {
      // navigate to home page when movie has been added
      this.router.navigateByUrl('');
    });
  }
}


