import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAtractivoComponent } from './agregar-atractivo.component';

describe('AgregarAtractivoComponent', () => {
  let component: AgregarAtractivoComponent;
  let fixture: ComponentFixture<AgregarAtractivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarAtractivoComponent]
    });
    fixture = TestBed.createComponent(AgregarAtractivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
