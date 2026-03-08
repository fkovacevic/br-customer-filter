import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeValueInput } from './attribute-value-input';

describe('AttributeValueInput', () => {
  let component: AttributeValueInput;
  let fixture: ComponentFixture<AttributeValueInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttributeValueInput],
    }).compileComponents();

    fixture = TestBed.createComponent(AttributeValueInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
