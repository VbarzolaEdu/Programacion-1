import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoIndex } from './empleado-index';

describe('EmpleadoIndex', () => {
  let component: EmpleadoIndex;
  let fixture: ComponentFixture<EmpleadoIndex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadoIndex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadoIndex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
