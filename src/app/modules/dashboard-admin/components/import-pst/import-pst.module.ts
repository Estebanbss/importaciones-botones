import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportComponent } from './import-pst.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [ ImportComponent],
  imports: [
    CommonModule,
    MatProgressBarModule,
  ],

  exports:[
    ImportComponent
  ]
})
export class ImportModule { }
