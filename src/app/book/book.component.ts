import {Component, OnInit, DoCheck,  Output} from '@angular/core';
import { Book } from '../entity';
import {EntityService} from '../entity.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, DoCheck {
  private books: Book[];   // 获取到的全部数据
  private dataShow: Book[];      // 分页后在当前页要显示的数据
  public leng: number;                 // 数据总量，需要传给子组件的变量
  public currentPag: number;           // 保存从子组件中传来的当前显示页面
  public pagNums: number;              // 保存从子组件中传来的每页显示数量
  public oldCurrentPag: number;
  public oldPagNums: number;
  constructor(
    private bookService: EntityService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getBooks();
  }
  // DoCheck 触发变更检测机制就是调用DoCheck钩子，目的是保证组件属性和浏览器的显示同步
  ngDoCheck(): void {
    if (this.currentPag !== this.oldCurrentPag || this.pagNums !== this.oldPagNums) {
      this.dataShow = [];
      let startNum = (this.currentPag - 1) * this.pagNums;
      for ( let i = 0; i < this.pagNums; i++, startNum++) {
        if ( this.books[startNum] !== null && this.books[startNum] !== undefined) {
          this.dataShow.push(this.books[startNum]);
        }
      }
      this.oldCurrentPag = this.currentPag;
      this.oldPagNums = this.pagNums;
    }
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
  // 获取所有Book数据
  getBooks(): void {
    this.bookService.getBooks ()
      .subscribe(res => {
        this.books = res; this.leng = res.length; });
  }
  getBookByName(name: string): void {
    this.bookService.getBookByName(name)
      .subscribe(res => {
        this.books = res;
        this.dataShow = [];
        this.dataShow.push(this.books[0]); });
  }
  // ifName(name: string): void {
  //   if (name) {
  //     alert(this.books)
  //     this.books.splice(0, this.books.length);
  //     alert(this.books)
  //     this.getBookByName(name);
  //     alert(this.books);
  //   } else {
  //     this.getBooks();
  //   }
  // }
  delete(book: Book | number): void {
    this.bookService.deleteBook(book)
      .subscribe(res => {
        alert(res.message); // 弹出后台给的消息
        // 以下代码用于成果删除一行数据后页面内容刷新，并将页面保持在原页数位置不变。
        // if ( res.message === '删除成功') { //如果成功删除后后台返回的数据是‘删除成功’，可以去点这里的注释
        this.books = this.books.filter(h => h !== book); // 过滤掉已经被删除数据
        this.dataShow = [];
        let startNum = (this.currentPag - 1) * this.pagNums;
        for ( let i = 0; i < this.pagNums; i++, startNum++) {
          if ( this.books[startNum] !== null && this.books[startNum] !== undefined) {
            this.dataShow.push(this.books[startNum]);
          }
        }
      });
  }
}
