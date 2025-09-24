import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeIndex } from './home-index';

describe('HomeIndex', () => {
  let component: HomeIndex;
  let fixture: ComponentFixture<HomeIndex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeIndex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeIndex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
