import {Component, OnInit, DoCheck,  Output} from '@angular/core';
import { BorrowBook } from '../entity';
import {EntityService} from '../entity.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  templateUrl: './borrow-book.component.html',
  styleUrls: ['./borrow-book.component.css']
})
export class BorrowBookComponent implements OnInit, DoCheck {
  private borrowBooks: BorrowBook[];   // 获取到的全部数据
  private dataShow: BorrowBook[];      // 分页后在当前页要显示的数据
  public leng: number;                 // 数据总量，需要传给子组件的变量
  public currentPag: number;           // 保存从子组件中传来的当前显示页面
  public pagNums: number;              // 保存从子组件中传来的每页显示数量
  public oldCurrentPag: number;
  public oldPagNums: number;
  constructor(
    private borrowBookService: EntityService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getBorrowBooks();
  }
  // DoCheck 触发变更检测机制就是调用DoCheck钩子，目的是保证组件属性和浏览器的显示同步
  ngDoCheck(): void {
    if (this.currentPag !== this.oldCurrentPag || this.pagNums !== this.oldPagNums) {
      this.dataShow = [];
      let startNum = (this.currentPag - 1) * this.pagNums;
      for ( let i = 0; i < this.pagNums; i++, startNum++) {
        if ( this.borrowBooks[startNum] !== null && this.borrowBooks[startNum] !== undefined) {
          this.dataShow.push(this.borrowBooks[startNum]);
        }
      }
      this.oldCurrentPag = this.currentPag;
      this.oldPagNums = this.pagNums;
    }
  }
  select(name: string): void {
    if (name === null) {
      this.borrowBookService.getBorrowBooks().subscribe(res => this.dataShow = res);
      return;
    }
    this.borrowBookService.selectBorrowBook(name).subscribe(res => this.dataShow = res);
  }
// 捕获当前显示页码函数
  currentPagHandel(pag: number) {
    this.currentPag = pag;
    console.log( 'curpag:' + pag );
  }
  // 捕获每页显示数量行数
  pagNumsHandel(pagNum: number) {
    this.pagNums = pagNum;
  }
  // 获取所有BorrowBook数据
  getBorrowBooks(): void {
    this.borrowBookService.getBorrowBooks ()
      .subscribe(res => {this.borrowBooks = res; this.leng = res.length; });
  }
  delete(borrowBook: BorrowBook | number): void {
    this.borrowBookService.deleteBorrowBook(borrowBook)
      .subscribe(res => {
        alert( res. message ); // 弹出后台给的消息
        // 以下代码用于成果删除一行数据后页面内容刷新，并将页面保持在原页数位置不变。
        // if ( res.message === '删除成功') { //如果成功删除后后台返回的数据是‘删除成功’，可以去点这里的注释
        this.borrowBooks = this.borrowBooks.filter(h => h !== borrowBook); // 过滤掉已经被删除数据
        this.dataShow = [];
        let startNum = (this.currentPag - 1) * this.pagNums;
        for ( let i = 0; i < this.pagNums; i++, startNum++) {
          if ( this.borrowBooks[startNum] !== null && this.borrowBooks[startNum] !== undefined) {
            this.dataShow.push(this.borrowBooks[startNum]);
          }
        }
      });
  }
}
