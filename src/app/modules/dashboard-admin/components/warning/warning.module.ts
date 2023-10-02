import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarningComponent } from './warning.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    WarningComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    FormsModule
  ],
  exports:[
    WarningComponent
  ]
})
export class WarningModule { }
