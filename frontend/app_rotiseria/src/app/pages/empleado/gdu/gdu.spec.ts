import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GDU } from './gdu';

describe('GDU', () => {
  let component: GDU;
  let fixture: ComponentFixture<GDU>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GDU]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GDU);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
