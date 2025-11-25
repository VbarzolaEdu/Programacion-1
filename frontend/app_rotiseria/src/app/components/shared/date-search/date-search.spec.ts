import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateSearch } from './date-search';

describe('DateSearch', () => {
  let component: DateSearch;
  let fixture: ComponentFixture<DateSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
