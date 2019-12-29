import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {EntityService} from '../entity.service';
import {Reader, Book, Manager, ReturnBook, BorrowBook} from '../entity';
@Component({
  templateUrl: './addReturnBook.component.html',
  styleUrls: ['./addReturnBook.component.css']
})
export class AddReturnBookComponent implements OnInit {
  @Input() readers: Reader[];
  books: Book[];
  book: Book;
  borrowBook: BorrowBook;
  manager: Manager;
  managers: Manager[];
  borrowBooks: BorrowBook[];
  returnBook: { no: string; reader: Reader; book: Book; borrowBook: BorrowBook; manager: Manager};
  reader: Reader;
  constructor(
    private route: ActivatedRoute,
    private returnBookService: EntityService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getReaders() ;
    this.getManagers();
    this.getBooks();
    this.getBorrowBooks();
  }
  getReaders(): void {
    this.returnBookService.getReaders()
      .subscribe(res => this.readers = res);
  }
  getBooks(): void {
    this.returnBookService.getBooks()
      .subscribe(res => this.books = res);
  }
  getManagers(): void {
    this.returnBookService.getManagers()
      .subscribe(res => this.managers = res);
  }
  getBorrowBooks(): void {
    this.returnBookService.getBorrowBooks()
      .subscribe(res => this.borrowBooks = res);
  }
  getBorBook(id: number): void {
    this.returnBookService.getBorBook (id)
      .subscribe(res => this.borrowBooks = res);
  }
  save(no: string, reader: Reader, book: Book, borrowBook: BorrowBook, manager: Manager): void { //多个文本框数据
    // @ts-ignore
    this.returnBook = {no: no.trim(), reader: this.reader, book: this.book, borrowBook: this.borrowBook, manager: this.manager};
    if (!no) { return; }
    this.returnBookService.addReturnBook(this.returnBook)
      .subscribe(() => this.goBack());
  }
  goBack(): void {
    this.location.back();
  }
  Number(value: string) {
    return parseInt(value, 10);
  }
  Date(value: string) {
    return;
  }
}

