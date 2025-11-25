import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoFilter } from './estado-filter';

describe('EstadoFilter', () => {
  let component: EstadoFilter;
  let fixture: ComponentFixture<EstadoFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadoFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
