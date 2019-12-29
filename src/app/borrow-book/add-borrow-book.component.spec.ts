import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBorrowBookComponent } from './add-borrow-book.component';

describe('AddBorrowBookComponent', () => {
  let component: AddBorrowBookComponent;
  let fixture: ComponentFixture<AddBorrowBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBorrowBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBorrowBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
