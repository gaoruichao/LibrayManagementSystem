import {Component, OnInit, Input, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {EntityService} from '../entity.service';
import {Reader, Book, Fine} from '../entity';
@Component({
  selector: 'app-update-fine',
  templateUrl: './update-fine.component.html',
})
export class UpdateFineComponent implements OnInit {
  /*定义模块输入，是用来让父级组件向子组件传递内容*/
  @Input() readers: Reader[];
  books: Book[];
  fine: Fine;
  constructor(
    private route: ActivatedRoute,
    private fineService: EntityService,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.getReaders(); // 下拉菜单赋值
    this.getBooks();
    const id = this.route.snapshot.params.id; // 要修改专业的id
    this.fineService.getFine(id)
      .subscribe(res => {
        this.fine = res;
      });
  }
  /*比较器*/
  compareFn(o1: Reader, o2: Reader): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
  getReaders(): void {
    this.fineService.getReaders()
      .subscribe(res => this.readers = res);
  }
  getBooks(): void {
    this.fineService.getBooks()
      .subscribe(res => this.books = res);
  }
  save(): void { // 多个文本框数据
    /*用于日志信息的一般输出。可以使用此方法使用字符串替换和附加参数。*/
    console.log(this.fine);
    if (!this.fine.no) {
      alert('no不能为空');
      return;
    } else if (!this.fine.fineAmount) {
      alert('fineAmount不能为空');
      return;
    } else if (!this.fine.description) {
      alert('description不能为空');
      return;
    } else if (!this.fine.reader) {
      alert('reader不能为空');
      return;
    } else if (!this.fine.book) {
      alert('book不能为空');
      return;
    }
    this.fineService.updateFine(this.fine)
      .subscribe((res) => {
        alert(res.message);
        this.goBack();
      });
  }

  goBack(): void {
    this.location.back();
  }
}
