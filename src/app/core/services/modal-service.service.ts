import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {;

  constructor() { }

  private valueSource = new BehaviorSubject<string>('');
  currentValue = this.valueSource.asObservable();

  private modalsuichpstSubject = new BehaviorSubject<boolean>(false);
  modalsuich$ = this.modalsuichpstSubject.asObservable();

  private warningSubject = new BehaviorSubject<boolean>(false);
  warning$ = this.warningSubject.asObservable();

  private modalsuichmuniSubject = new BehaviorSubject<boolean>(false);
  modalsuichmuni$ = this. modalsuichmuniSubject.asObservable();

  private modalsuichatracSubject = new BehaviorSubject<boolean>(false);
  modalsuichatrac$ = this.modalsuichatracSubject.asObservable();

  private modalsuichrutasSubject = new BehaviorSubject<boolean>(false);
  modalsuichrutas$ = this.modalsuichrutasSubject.asObservable();

  private modalsuichtodoSubject = new BehaviorSubject<boolean>(false);
  modalsuichtodo$ = this. modalsuichtodoSubject.asObservable();

  setModalSuichPst(value: boolean) {
    this.modalsuichpstSubject.next(value);
  }
  setWarning(value: boolean) {
    this.warningSubject.next(value);
  }
  setModalSuichMuni(value: boolean) {
    this.modalsuichmuniSubject.next(value);
  }

  setValue(value: string) {
    this.valueSource.next(value);
  }

  setModalSuichAtrac(value: boolean) {
    this.modalsuichatracSubject.next(value);
  }
  setModalSuichRutas(value: boolean) {
    this.modalsuichrutasSubject.next(value);
  }
  setModalSuichTodo(value: boolean) {
    this.modalsuichtodoSubject.next(value);
  }


}
