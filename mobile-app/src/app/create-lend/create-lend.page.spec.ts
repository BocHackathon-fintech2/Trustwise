import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLendPage } from './create-lend.page';

describe('CreateLendPage', () => {
  let component: CreateLendPage;
  let fixture: ComponentFixture<CreateLendPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLendPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
