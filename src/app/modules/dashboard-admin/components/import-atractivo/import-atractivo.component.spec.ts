import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportAtractivoComponent } from './import-atractivo.component';

describe('ImportAtractivoComponent', () => {
  let component: ImportAtractivoComponent;
  let fixture: ComponentFixture<ImportAtractivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportAtractivoComponent]
    });
    fixture = TestBed.createComponent(ImportAtractivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
