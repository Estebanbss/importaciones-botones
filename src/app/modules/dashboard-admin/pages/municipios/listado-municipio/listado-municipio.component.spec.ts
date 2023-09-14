import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoMunicipioComponent } from './listado-municipio.component';

describe('ListadoMunicipioComponent', () => {
  let component: ListadoMunicipioComponent;
  let fixture: ComponentFixture<ListadoMunicipioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoMunicipioComponent]
    });
    fixture = TestBed.createComponent(ListadoMunicipioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
