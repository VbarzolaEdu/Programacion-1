import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calificaciones } from './calificaciones';

describe('Calificaciones', () => {
  let component: Calificaciones;
  let fixture: ComponentFixture<Calificaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Calificaciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Calificaciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
