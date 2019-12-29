import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBorrowBookComponent } from './update-borrow-book.component';

describe('UpdateBorrowBookComponent', () => {
  let component: UpdateBorrowBookComponent;
  let fixture: ComponentFixture<UpdateBorrowBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBorrowBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBorrowBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
