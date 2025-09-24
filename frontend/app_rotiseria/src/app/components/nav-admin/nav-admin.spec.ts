import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAdmin } from './nav-admin';

describe('NavAdmin', () => {
  let component: NavAdmin;
  let fixture: ComponentFixture<NavAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
