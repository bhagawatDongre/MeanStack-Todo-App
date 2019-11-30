import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private api: ApiService,
    private formBuilder: FormBuilder
  ) { }

  todo:any = {};
  todoForm: FormGroup;
  title: string = '';
  description: string = '';
  due_date: string = '';
  priority: string = '';


  VALID: string = 'VALID'
  INVALID: string = 'INVALID'

  ngOnInit() {
    this.todoForm = this.formBuilder.group({
      'title': [null, Validators.required],
      'description': [null, Validators.required],
      'due_date': [null, Validators.required],
      'priority': ['0', Validators.required]
    });

    this.getBookDetails(this.route.snapshot.params['id']);
  }

  getBookDetails(id) {
    this.api.getTodo(id)
      .subscribe(data => {
        debugger;
        console.log(data);
        this.todo = data;
        this.todoForm.controls.title.setValue(data.title);
        this.todoForm.controls.description.setValue(data.description);
        this.todoForm.controls.due_date.setValue(data.due_date);
        this.todoForm.controls.priority.setValue(data.priority);
      });
      
  }

  onClickSubmit(form: NgForm) {
    if (this.todoForm.controls.title.status === this.INVALID) {
      alert('invalid title');
      return;
    }

    debugger;

    this.api.updateTodo(this.todo._id, form)
      .subscribe(res => {
        debugger;
        this.router.navigate(['/todo']);
      }, (err) => {
        debugger;

        console.log(err);
      });
  }
}
