import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportMunicipioComponent } from './import-municipio.component';

describe('ImportMunicipioComponent', () => {
  let component: ImportMunicipioComponent;
  let fixture: ComponentFixture<ImportMunicipioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportMunicipioComponent]
    });
    fixture = TestBed.createComponent(ImportMunicipioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
