import { Component, OnInit, DoCheck } from '@angular/core';
import {EntityService} from '../entity.service';
import {Manager} from '../entity';


@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
})
export class ManagerComponent implements OnInit, DoCheck {
  private managers: Manager[];
  private dataShow: Manager[];      // 分页后在当前页要显示的数据
  public leng: number;                 // 数据总量，需要传给子组件的变量
  public currentPag: number;           // 保存从子组件中传来的当前显示页面
  public pagNums: number;              // 保存从子组件中传来的每页显示数量
  public oldCurrentPag: number;
  public oldPagNums: number;
  constructor(private managerService: EntityService) { }

  ngOnInit() {
    this.getManagers();
  }
  // DoCheck 触发变更检测机制就是调用DoCheck钩子，目的是保证组件属性和浏览器的显示同步
  ngDoCheck(): void {
    if (this.currentPag !== this.oldCurrentPag || this.pagNums !== this.oldPagNums) {
      this.dataShow = [];
      let startNum = (this.currentPag - 1) * this.pagNums;
      for ( let i = 0; i < this.pagNums; i++, startNum++) {
        if ( this.managers[startNum] !== null && this.managers[startNum] !== undefined) {
          this.dataShow.push(this.managers[startNum]);
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
  getManagers(): void {
    this.managerService.getManagers ()
      .subscribe(res => {this.managers = res; this.leng = res.length; }); // 注意添加leng赋值
  }
  getManagerByname(name: string): void {
    this.managerService.getManagerByname(name)
      .subscribe(res => {
        this.managers = res;
        this.dataShow = [];
        this.dataShow.push(this.managers[0]); });
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
  delete(manager: Manager | number): void {
    this.managers = this.managers.filter(h => h !== manager);
    this.managerService.deleteManager(manager).subscribe(res => {
      alert(res.message); // 弹出后台给的消息
      // 以下代码用于成果删除一行数据后页面内容刷新，并将页面保持在原页数位置不变。
      // if ( res.message === '删除成功') { //如果成功删除后后台返回的数据是‘删除成功’，可以去点这里的注释
      this.managers = this.managers.filter(h => h !== manager); // 过滤掉已经被删除数据
      this.dataShow = [];
      let startNum = (this.currentPag - 1) * this.pagNums;
      for ( let i = 0; i < this.pagNums; i++, startNum++) {
        if ( this.managers[startNum] !== null && this.managers[startNum] !== undefined) {
          this.dataShow.push(this.managers[startNum]);
        }
      }
    });
  }
}
