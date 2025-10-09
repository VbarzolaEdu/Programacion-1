import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosAdmin } from './pedidos';

describe('Pedidos', () => {
  let component: PedidosAdmin;
  let fixture: ComponentFixture<PedidosAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidosAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidosAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
