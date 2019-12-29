import {Component, OnInit, Input, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {EntityService} from '../entity.service';
import {Reader, Book, Manager,  BorrowBook} from '../entity';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-update-borrow-book',
  templateUrl: './update-borrow-book.component.html',
})
export class UpdateBorrowBookComponent implements OnInit {
  /*定义模块输入，是用来让父级组件向子组件传递内容*/
  @Input() readers: Reader[];
  books: Book[];
  managers: Manager[];
  borrowBook: BorrowBook;
  constructor(
    private route: ActivatedRoute,
    private borrowBookService: EntityService,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.getReaders(); // 下拉菜单赋值
    this.getBooks();
    this.getManagers();
    const id = this.route.snapshot.params.id; // 要修改专业的id
    this.borrowBookService.getBorrowBook(id)
      .subscribe(res => {
        this.borrowBook = res;
      });
  }
  /*比较器*/
  compareFn(o1: Reader, o2: Reader): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
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
  save(): void { // 多个文本框数据
    /*用于日志信息的一般输出。可以使用此方法使用字符串替换和附加参数。*/
    console.log(this.borrowBook);
    if (!this.borrowBook.no) {
      alert('no不能为空');
      return;
    } else if (!this.borrowBook.borrowDate) {
      alert('borrowDate不能为空');
      return;
    } else if (!this.borrowBook.reader) {
      alert('reader不能为空');
      return;
    } else if (!this.borrowBook.book) {
      alert('book不能为空');
      return;
    } else if (!this.borrowBook.manager) {
      alert('manager不能为空');
      return;
    }
    this.borrowBookService.updateBorrowBook(this.borrowBook)
      .subscribe((res) => {
        alert(res.message);
        this.goBack();
      });
  }

  goBack(): void {
    this.location.back();
  }
}
