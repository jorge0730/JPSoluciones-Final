import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdpedidosComponent } from './adpedidos.component';

describe('AdpedidosComponent', () => {
  let component: AdpedidosComponent;
  let fixture: ComponentFixture<AdpedidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdpedidosComponent]
    });
    fixture = TestBed.createComponent(AdpedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
