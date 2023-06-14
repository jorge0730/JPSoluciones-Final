import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmensajesComponent } from './admensajes.component';

describe('AdmensajesComponent', () => {
  let component: AdmensajesComponent;
  let fixture: ComponentFixture<AdmensajesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmensajesComponent]
    });
    fixture = TestBed.createComponent(AdmensajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
