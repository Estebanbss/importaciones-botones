import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPrestadorComponent } from './editar-prestador.component';

describe('EditarPrestadorComponent', () => {
  let component: EditarPrestadorComponent;
  let fixture: ComponentFixture<EditarPrestadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarPrestadorComponent]
    });
    fixture = TestBed.createComponent(EditarPrestadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
