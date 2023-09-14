import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoAtractivoComponent } from './listado-atractivo.component';

describe('ListadoAtractivoComponent', () => {
  let component: ListadoAtractivoComponent;
  let fixture: ComponentFixture<ListadoAtractivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoAtractivoComponent]
    });
    fixture = TestBed.createComponent(ListadoAtractivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
