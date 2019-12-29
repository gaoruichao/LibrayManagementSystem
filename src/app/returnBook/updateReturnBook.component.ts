import {Component, OnInit, Input, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {EntityService} from '../entity.service';
import {Reader, Book, Manager, ReturnBook, BorrowBook} from '../entity';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'appUpdateReturnBook',
  templateUrl: './updateReturnBook.component.html',
})
export class UpdateReturnBookComponent implements OnInit {
  /*定义模块输入，是用来让父级组件向子组件传递内容*/
  @Input() readers: Reader[];
  books: Book[];
  managers: Manager[];
  borrowBooks: BorrowBook[];
  returnBook: ReturnBook;
  constructor(
    private route: ActivatedRoute,
    private returnBookService: EntityService,
    private location: Location
  ) {
  }
  ngOnInit() {
    this.getReaders(); // 下拉菜单赋值
    this.getBooks();
    this.getManagers();
    this.getBorrowBooks();
    const id = this.route.snapshot.params.id; // 要修改专业的id
    this.returnBookService.getReturnBook(id)
      .subscribe(res => {
        this.returnBook = res;
      });
  }
  /*比较器*/
  compareFn(o1: Reader, o2: Reader): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
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
  save(): void { // 多个文本框数据
    /*用于日志信息的一般输出。可以使用此方法使用字符串替换和附加参数。*/
    console.log(this.returnBook);
    if (!this.returnBook.no) {
      alert('no不能为空');
      return;
    } else if (!this.returnBook.returnDate) {
      alert('returnDate不能为空');
      return;
    } else if (!this.returnBook.reader) {
      alert('reader不能为空');
      return;
    } else if (!this.returnBook.book) {
      alert('book不能为空');
      return;
    } else if (!this.returnBook.manager) {
      alert('manager不能为空');
      return;
    } else if (!this.returnBook.borrowBook) {
      alert('borrowBook不能为空');
      return;
    }
    this.returnBookService.updateReturnBook(this.returnBook)
      .subscribe((res) => {
        alert(res.message);
        this.goBack();
      });
  }
  goBack(): void {
    this.location.back();
  }
}
