import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteHome } from './cliente-home';

describe('ClienteHome', () => {
  let component: ClienteHome;
  let fixture: ComponentFixture<ClienteHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
