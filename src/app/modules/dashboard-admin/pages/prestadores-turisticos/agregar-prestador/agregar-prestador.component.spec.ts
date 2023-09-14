import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPrestadorComponent } from './agregar-prestador.component';

describe('AgregarPrestadorComponent', () => {
  let component: AgregarPrestadorComponent;
  let fixture: ComponentFixture<AgregarPrestadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarPrestadorComponent]
    });
    fixture = TestBed.createComponent(AgregarPrestadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
