import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoP } from './estado-p';

describe('EstadoP', () => {
  let component: EstadoP;
  let fixture: ComponentFixture<EstadoP>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadoP]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoP);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
