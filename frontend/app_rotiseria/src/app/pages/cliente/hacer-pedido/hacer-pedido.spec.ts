import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HacerPedido } from './hacer-pedido';

describe('HacerPedido', () => {
  let component: HacerPedido;
  let fixture: ComponentFixture<HacerPedido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HacerPedido]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HacerPedido);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
