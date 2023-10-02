import { Component } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ModalServiceService } from 'src/app/core/services/modal-service.service';
import { PrestadoresService } from 'src/app/core/services/prestadores.service';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})
export class WarningComponent {

  constructor( private MatProgressBarModule: MatProgressBarModule, private modalService: ModalServiceService,private prestadoresService: PrestadoresService,) { }

  inputValue: string = '';
  Value: string = '';


  closemodal() {
    this.modalService.setWarning(false);//cierra el modal
   }

 ngOnInit(): void {
  this.modalService.currentValue.subscribe(value => this.Value = value);
 }




  borrartodo(){
    this.prestadoresService.borrarTodosLosDocumentos(this.Value);
    this.closemodal()
  }
}
