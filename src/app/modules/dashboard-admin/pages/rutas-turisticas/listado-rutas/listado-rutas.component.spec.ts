import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoRutasComponent } from './listado-rutas.component';

describe('ListadoRutasComponent', () => {
  let component: ListadoRutasComponent;
  let fixture: ComponentFixture<ListadoRutasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoRutasComponent]
    });
    fixture = TestBed.createComponent(ListadoRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
