import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportMunicipioComponent } from './import-municipio.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';



@NgModule({
  declarations: [
    ImportMunicipioComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule
  ],
  exports:[
    ImportMunicipioComponent
  ]
})
export class ImportMunicipioModule { }
