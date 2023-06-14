import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UssolicitudesComponent } from './ussolicitudes.component';

describe('UssolicitudesComponent', () => {
  let component: UssolicitudesComponent;
  let fixture: ComponentFixture<UssolicitudesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UssolicitudesComponent]
    });
    fixture = TestBed.createComponent(UssolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
