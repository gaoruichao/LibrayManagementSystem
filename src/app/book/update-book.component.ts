import {Component, OnInit, Input, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {EntityService} from '../entity.service';
import {BookType, Book} from '../entity';
@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
})
export class UpdateBookComponent implements OnInit {
  /*定义模块输入，是用来让父级组件向子组件传递内容*/
  @Input() bookTypes: BookType[];
  book: Book;
  constructor(
    private route: ActivatedRoute,
    private bookService: EntityService,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.getBookTypes(); // 下拉菜单赋值
    const id = this.route.snapshot.params.id; // 要修改专业的id
    this.bookService.getBook(id)
      .subscribe(res => {
        this.book = res;
      });
  }
  /*比较器*/
  compareFn(o1: BookType, o2: BookType): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
  getBookTypes(): void {
    this.bookService.getBookTypes()
      .subscribe(res => this.bookTypes = res);
  }
  save(): void { // 多个文本框数据
    /*用于日志信息的一般输出。可以使用此方法使用字符串替换和附加参数。*/
    console.log(this.book);
    this.bookService.updateBook(this.book)
      .subscribe((res) => {
        alert(res.message);
        this.goBack();
      });
  }

  goBack(): void {
    this.location.back();
  }
}
