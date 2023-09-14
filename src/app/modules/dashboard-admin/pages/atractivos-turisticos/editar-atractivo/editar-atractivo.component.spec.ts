import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAtractivoComponent } from './editar-atractivo.component';

describe('EditarAtractivoComponent', () => {
  let component: EditarAtractivoComponent;
  let fixture: ComponentFixture<EditarAtractivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarAtractivoComponent]
    });
    fixture = TestBed.createComponent(EditarAtractivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
