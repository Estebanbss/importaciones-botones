import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ImportComponent } from './import.component';


@NgModule({
  declarations: [ImportComponent],
  imports: [
    CommonModule,
    MatProgressBarModule,
  ],

  exports:[
    ImportComponent
  ]
})
export class ImportModule { }
