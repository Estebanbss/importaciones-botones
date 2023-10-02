import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportRutasComponent } from './import-rutas.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';




@NgModule({
  declarations: [ImportRutasComponent],
  imports: [
    CommonModule,
    MatProgressBarModule,
  ],
  exports:[ImportRutasComponent]
})
export class ImportRutasModule { }
