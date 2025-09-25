import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calificar } from './calificar';

describe('Calificar', () => {
  let component: Calificar;
  let fixture: ComponentFixture<Calificar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Calificar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Calificar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
