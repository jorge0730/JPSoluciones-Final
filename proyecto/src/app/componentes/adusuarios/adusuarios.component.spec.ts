import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdusuariosComponent } from './adusuarios.component';

describe('AdusuariosComponent', () => {
  let component: AdusuariosComponent;
  let fixture: ComponentFixture<AdusuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdusuariosComponent]
    });
    fixture = TestBed.createComponent(AdusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
