import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css'],

})

export class ImportComponent {

  constructor(private matProgressBarModule: MatProgressBarModule) {}

  data:any = [];
  progress:number = 0;
  mode='determinate'
  value:any=0

  fileUpload(event:any){
    this.progress = 0;
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onprogress = (event) => {
      this.progress = Math.round((event.loaded / event.total) * 100);
      this.value=this.progress
      console.log(`Progress: ${this.progress}%`);
    };
    fileReader.onload = (event) => {
      let binaryData = event.target?.result;
      let workbook = XLSX.read(binaryData, {type: 'binary'});
      workbook.SheetNames.forEach(sheet => {const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]); this.data.push(data) })
    }
  }


}
