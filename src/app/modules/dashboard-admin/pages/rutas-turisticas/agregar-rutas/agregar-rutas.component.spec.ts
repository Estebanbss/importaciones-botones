import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarRutasComponent } from './agregar-rutas.component';

describe('AgregarRutasComponent', () => {
  let component: AgregarRutasComponent;
  let fixture: ComponentFixture<AgregarRutasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarRutasComponent]
    });
    fixture = TestBed.createComponent(AgregarRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
