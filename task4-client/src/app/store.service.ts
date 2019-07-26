import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from 'models/todo.model';
import { Member } from 'models/member.model';
import { TodosService } from './todos.service';
import { MembersService } from './members.service';


export interface IState {
    todos: Todo[];
    members: Member[];
  
}

const initialState: IState = {
  todos: [],
  members: []
}

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    private readonly _store = new BehaviorSubject<IState>(initialState);
    constructor(
      private todoService: TodosService,
      private memberService: MembersService,
    ) { }

    get currentState(): IState {
        return this._store.getValue();
    }

    setState(newState: Partial<IState>) {
        this._store.next({
            ...this.currentState,
            ...newState,
        })
    }

    getTodos() {
        this.todoService.getTodoListFromServer().subscribe(todos => {
            this.setState({
              todos,
            });
        })
    }
    getMembers() {
      this.memberService.getHomeMembersFromServer().subscribe(members => {
          this.setState({
            members,
          });
      })
  }

    get todos(): Todo[] {
        return this.currentState.todos;
    }
    get members(): Member[] {
      return this.currentState.members;
  }
  addTodo(todo: Todo) {
    return this.todoService.addTodoToServer(todo).subscribe(todoFromServer => {
      console.log(todoFromServer)

      // it's important to add the movieForm retrieved from the server cause it contains the server-generated id!
      this.setState({
        todos: this.todos.concat(todoFromServer),
      });
    });
  }

  deleteTodo(id: string) {
    console.log("delete store")
     this.todoService.deleteTodoFromServer(id).subscribe(
      todo => console.log('todo'),
      error => console.log('Error: ', error),
      () => {
        this.getTodos()
      }
     );
  }
    // getApartmentById(id: string) {
    //     this.apartmentService.getApartmentDetailsFromServer(id).subscribe(apartment => {
    //         this.setState({
    //             selectedApartment: apartment
    //         });
    //     });
    // }
    // get selectedApartment(): Apartment {
    //     return this.currentState.selectedApartment;
    // }
    // addApartment(apartment: Apartment) {
    //     return this.apartmentService.addApartmentToServer(apartment).subscribe(apartmentFromServer => {
    //       // it's important to add the movieForm retrieved from the server cause it contains the server-generated id!
    //       this.setState({
    //         apartments: this.apartments.concat(apartmentFromServer),
    //       });
    //     });
    //   }
    //    deleteApartment(id: string) {
    //       console.log("delete store")
    //        this.apartmentService.deleteApartmentFromServer(id).subscribe(
    //         apartment => console.log('apartment'),
    //         error => console.log('Error: ', error),
    //         () => console.log('finished')
    //        );
    //     //    this.apartmentService.getApartmentsFromServer().subscribe(apartments => {
    //     //     this.setState({
    //     //       apartments,
    //     //     });
    //     // })

         
    //   }
    //   get types(): Type[] {
    //     return this.currentState.types;
    // }

    // get selectedType(): IState['selectedType'] {
    //     return this.currentState.selectedType;
    // }
   
    // getTypes() {
    //     this.typeService.getTypesFromServer().subscribe(types => {
    //       this.setState({
    //         types,
    //       });
    //     });
    //   }
  
    //   setSelectedType(typeName: string) {
    //     this.setState({
    //       selectedType: typeName,
    //     });
    //     console.log(this.currentState.selectedType)
    //   }

    // get filteredApartments(): Apartment[] {
    //     if (!this.selectedType) {
    //       return this.apartments;
    //     }
    //     return this.currentState.apartments.filter(apartment => this.selectedType===apartment.type);
    //   }
}