import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCliente } from './nav-cliente';

describe('NavCliente', () => {
  let component: NavCliente;
  let fixture: ComponentFixture<NavCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavCliente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
