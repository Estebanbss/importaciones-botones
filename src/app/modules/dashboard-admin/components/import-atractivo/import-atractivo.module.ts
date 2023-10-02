import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportAtractivoComponent } from './import-atractivo.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';



@NgModule({
  declarations: [ImportAtractivoComponent],
  imports: [
    CommonModule,
    MatProgressBarModule,
  ],
  exports:[
    ImportAtractivoComponent]
})
export class ImportAtractivoModule { }
