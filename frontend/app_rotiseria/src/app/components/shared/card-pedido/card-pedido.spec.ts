import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPedido } from './card-pedido';

describe('CardPedido', () => {
  let component: CardPedido;
  let fixture: ComponentFixture<CardPedido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPedido]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPedido);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
