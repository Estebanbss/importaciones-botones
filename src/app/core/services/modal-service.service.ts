import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {
  private modalsuich: boolean = false;

  constructor() { }

  private modalsuichSubject = new BehaviorSubject<boolean>(false);
  modalsuich$ = this.modalsuichSubject.asObservable();

  setModalsuich(value: boolean) {
    this.modalsuichSubject.next(value);
  }
}
