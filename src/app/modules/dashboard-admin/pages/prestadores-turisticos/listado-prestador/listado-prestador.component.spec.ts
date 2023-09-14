import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPrestadorComponent } from './listado-prestador.component';

describe('ListadoPrestadorComponent', () => {
  let component: ListadoPrestadorComponent;
  let fixture: ComponentFixture<ListadoPrestadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoPrestadorComponent]
    });
    fixture = TestBed.createComponent(ListadoPrestadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
