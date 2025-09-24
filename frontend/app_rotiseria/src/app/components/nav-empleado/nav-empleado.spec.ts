import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavEmpleado } from './nav-empleado';

describe('NavEmpleado', () => {
  let component: NavEmpleado;
  let fixture: ComponentFixture<NavEmpleado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavEmpleado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavEmpleado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
