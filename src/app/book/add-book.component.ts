import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {EntityService} from '../entity.service';
import {BookType, Book} from '../entity';
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  @Input() bookTypes: BookType[];
  book: {no: string,
    isbn: string,
    bookName: string,
    author: string,
    publish: string,
    publishDate: string,
    unitPrice: number,
    bookType: BookType,
    bookStatus: number};
  bookType: BookType;
  constructor(
    private route: ActivatedRoute,
    private bookService: EntityService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getBookTypes() ;
  }
  getBookTypes(): void {
    this.bookService.getBookTypes()
      .subscribe(res => this.bookTypes = res);
  }

  save(no: string,
       isbn: string,
       bookName: string,
       author: string,
       publish: string,
       publishDate: string,
       unitPrice: number,
       bookType: BookType,
       bookStatus: number): void { //多个文本框数据
    // @ts-ignore
    this.book = {no: no.trim(), isbn: isbn.trim(), bookName: bookName.trim(), author: author.trim(), publish: publish.trim(), publishDate: publishDate.trim(), unitPrice: unitPrice.valueOf(), bookType : this.bookType , bookStatus: bookStatus.valueOf()};
    if (!no) { return; }
    this.bookService.addBook(this.book)
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
