import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss']
})
export class TodoCreateComponent implements OnInit {

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private api: ApiService, 
    private formBuilder: FormBuilder
  ) { }
  todoForm: FormGroup;
  title: string = '';
  description: string = '';
  due_date: string = '';
  priority: string = '';

  VALID:string = 'VALID'  
  INVALID:string = 'INVALID'

  ngOnInit() {
    this.todoForm = this.formBuilder.group({
      'title': [null, Validators.required],
      'description': [null, Validators.required],
      'due_date': ['2019-11-14T00:00:00.000Z', Validators.required],
      'priority': ['0', Validators.required]
    });
  }

  onClickSubmit(form: NgForm) {
    if (this.todoForm.controls.title.status === this.INVALID) {
      alert('invalid title');
      return;
    }

    this.api.postTodo(form)
      .subscribe(res => {
        this.router.navigate(['/todo']);
      }, (err) => {
        console.log(err);
      });
   }

}
