import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportTodoComponent } from './import-todo.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';



@NgModule({
  declarations: [ImportTodoComponent],
  imports: [
    CommonModule,
    MatProgressBarModule,
  ],
  exports:[
    ImportTodoComponent
  ]
})
export class ImportTodoModule { }
