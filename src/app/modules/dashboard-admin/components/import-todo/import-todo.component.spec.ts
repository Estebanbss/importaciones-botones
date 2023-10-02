import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportTodoComponent } from './import-todo.component';

describe('ImportTodoComponent', () => {
  let component: ImportTodoComponent;
  let fixture: ComponentFixture<ImportTodoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportTodoComponent]
    });
    fixture = TestBed.createComponent(ImportTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
