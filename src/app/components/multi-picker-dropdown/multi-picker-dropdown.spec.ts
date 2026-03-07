import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiPickerDropdown } from './multi-picker-dropdown';

describe('MultiPickerDropdown', () => {
  let component: MultiPickerDropdown;
  let fixture: ComponentFixture<MultiPickerDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiPickerDropdown],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiPickerDropdown);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
