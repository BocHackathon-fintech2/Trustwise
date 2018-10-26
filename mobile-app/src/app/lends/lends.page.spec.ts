import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LendsPage } from './lends.page';

describe('LendsPage', () => {
  let component: LendsPage;
  let fixture: ComponentFixture<LendsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LendsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LendsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
