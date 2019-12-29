import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {EntityService} from '../entity.service';
import {Reader, Book, Manager } from '../entity';
@Component({
  selector: 'app-add-borrow-book',
  templateUrl: './add-borrow-book.component.html',
  styleUrls: ['./add-borrow-book.component.css']
})
export class AddBorrowBookComponent implements OnInit {
  @Input() readers: Reader[];
  books: Book[];
  managers: Manager[];
  borrowBook: { no: string; reader: Reader; book: Book; manager: Manager};
  reader: Reader;
  book: Book;
  manager: Manager;
  constructor(
    private route: ActivatedRoute,
    private borrowBookService: EntityService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getReaders() ;
    this.getManagers();
    this.getBooks();
  }
  getReaders(): void {
    this.borrowBookService.getReaders()
      .subscribe(res => this.readers = res);
  }
  getBooks(): void {
    this.borrowBookService.getBooks()
      .subscribe(res => this.books = res);
  }
  getManagers(): void {
    this.borrowBookService.getManagers()
      .subscribe(res => this.managers = res);
  }
  save(no: string, reader: Reader, book: Book, manager: Manager): void { //多个文本框数据
    // @ts-ignore
    this.borrowBook = {no: no.trim(), reader: this.reader, book: this.book, manager: this.manager};
    if (!no) {
      alert('no不能为空');
      return;
    }  else if (!reader) {
      alert('reader不能为空');
      return;
    } else if (!book) {
      alert('book不能为空');
      return;
    } else if (!manager) {
      alert('manager不能为空');
      return;
    }
    this.borrowBookService.addBorrowBook(this.borrowBook)
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
