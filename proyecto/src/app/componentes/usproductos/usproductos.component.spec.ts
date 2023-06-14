import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsproductosComponent } from './usproductos.component';

describe('UsproductosComponent', () => {
  let component: UsproductosComponent;
  let fixture: ComponentFixture<UsproductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsproductosComponent]
    });
    fixture = TestBed.createComponent(UsproductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
