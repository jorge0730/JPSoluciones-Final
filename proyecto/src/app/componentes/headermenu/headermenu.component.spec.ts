import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadermenuComponent } from './headermenu.component';

describe('HeadermenuComponent', () => {
  let component: HeadermenuComponent;
  let fixture: ComponentFixture<HeadermenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeadermenuComponent]
    });
    fixture = TestBed.createComponent(HeadermenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
