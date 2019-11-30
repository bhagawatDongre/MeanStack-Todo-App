import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodoCreateComponent } from './todo-create/todo-create.component';
import { TodoEditComponent } from './todo-edit/todo-edit.component';
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule
} from "@angular/material";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


const appRoutes: Routes = [
  {
    path: 'todo',
    component: TodoComponent,
    data: { title: 'Todo List' }
  },
  {
    path: 'todo-details/:id',
    component: TodoDetailComponent,
    data: { title: 'Todo Details' }
  },
  {
    path: 'todo-create',
    component: TodoCreateComponent,
    data: { title: 'Create Todo' }
  },
  {
    path: 'todo-edit/:id',
    component: TodoEditComponent,
    data: { title: 'Edit Todo' }
  },
  {
    path: '',
    redirectTo: '/todo',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoDetailComponent,
    TodoCreateComponent,
    TodoEditComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true }),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
