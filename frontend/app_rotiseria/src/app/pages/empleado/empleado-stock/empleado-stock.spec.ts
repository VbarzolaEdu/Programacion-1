import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoStock } from './empleado-stock';

describe('EmpleadoStock', () => {
  let component: EmpleadoStock;
  let fixture: ComponentFixture<EmpleadoStock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadoStock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadoStock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
