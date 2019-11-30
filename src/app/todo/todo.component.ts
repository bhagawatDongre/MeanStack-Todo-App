import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})


export class TodoComponent implements OnInit {
  todo: any = {};
  tableTitle:string = 'Todo List';
  tableCol:any;
  tableColHeaderName: any;

  priorityMapText : any = {
    '0': 'Low',
    '1': 'Medium',
    '2': 'High'
  }

  constructor(
    private api: ApiService,
    private router: Router,
  ) { 

  }

  ngOnInit() {
    this.api.getTodos()
      .subscribe(res => {
        this.todo = res;

        // sort to dos by priority
        this.todo.sort((a, b)=> {
          a = parseInt(a.priority);
          b = parseInt(b.priority);
          if (a > b) return -1;
          if (b > a) return 1;

          return 0;
        });

        // sort to dos by due date
        this.todo.sort((a, b) => {
          a = new Date(a.due_date).getTime();
          b = new Date(b.due_date).getTime();

          if (a > b) return 1;
          if (b > a) return -1;

          return 0;
        });


        // format show data 
        this.todo.map(todo => {
          todo.priority = this.priorityMapText[todo.priority];
          let date = new Date(todo.due_date);

          var GivenDate1 = todo.due_date;
          var CurrentDate = new Date();
          var GivenDate = new Date(GivenDate1);

          if (GivenDate > CurrentDate) {
            todo.isOverDue = false;
          } else {
            todo.isOverDue = true;
          }


          todo.due_date = date.getDate() + ' - ' + date.getMonth() + ' - ' + date.getFullYear();
        });

        this.tableCol = [
          "priority",
          "title",
          "description",
          "due_date",
        ];
        this.tableColHeaderName = [
          "Priority",
          "Title",
          "Description",
          "Due Date",
        ];
      }, err => {
        console.log(err);
      });
  }

  deleteTodo (id) {
    this.api.deleteTodo(id)
      .subscribe(res => {
        this.router.navigate(['/todo']);
        window.location.reload();
      }, (err) => {
        console.log(err);
      });
  }

  editTodo(id) {
    this.router.navigate(['/todo-edit', id]);
  }

  todoSelected (data) {

  }
}
