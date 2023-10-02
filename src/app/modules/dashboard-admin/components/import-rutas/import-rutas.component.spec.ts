import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportRutasComponent } from './import-rutas.component';

describe('ImportRutasComponent', () => {
  let component: ImportRutasComponent;
  let fixture: ComponentFixture<ImportRutasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportRutasComponent]
    });
    fixture = TestBed.createComponent(ImportRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
