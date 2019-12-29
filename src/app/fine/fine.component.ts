import {Component, OnInit, DoCheck,  Output} from '@angular/core';
import { Fine, Reader} from '../entity';
import {EntityService} from '../entity.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  templateUrl: './fine.component.html',
  styleUrls: ['./fine.component.css']
})
export class FineComponent implements OnInit, DoCheck {
  private fines: Fine[];   // 获取到的全部数据
  private dataShow: Fine[];      // 分页后在当前页要显示的数据
  public leng: number;                 // 数据总量，需要传给子组件的变量
  public currentPag: number;           // 保存从子组件中传来的当前显示页面
  public pagNums: number;              // 保存从子组件中传来的每页显示数量
  public oldCurrentPag: number;
  public oldPagNums: number;
  private reader: Reader;
  constructor(
    private fineService: EntityService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getFines();
  }
  // DoCheck 触发变更检测机制就是调用DoCheck钩子，目的是保证组件属性和浏览器的显示同步
  ngDoCheck(): void {
    if (this.currentPag !== this.oldCurrentPag || this.pagNums !== this.oldPagNums) {
      this.dataShow = [];
      let startNum = (this.currentPag - 1) * this.pagNums;
      for ( let i = 0; i < this.pagNums; i++, startNum++) {
        if ( this.fines[startNum] !== null && this.fines[startNum] !== undefined) {
          this.dataShow.push(this.fines[startNum]);
        }
      }
      this.oldCurrentPag = this.currentPag;
      this.oldPagNums = this.pagNums;
    }
  }
  select(name: string): void {
    if (name === null) {
      this.fineService.getFines()
        .subscribe(res => this.dataShow = res);
      return;
    }
    this.fineService.selectFine(name)
      .subscribe(res => this.dataShow = res);
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
  // 获取所有Fine数据
  getFines(): void {
    this.fineService.getFines ()
      .subscribe(res => {this.fines = res; this.leng = res.length; });
  }
  delete(fine: Fine | number): void {
    this.fineService.deleteFine(fine)
      .subscribe(res => {
        alert( res. message ); // 弹出后台给的消息
        // 以下代码用于成果删除一行数据后页面内容刷新，并将页面保持在原页数位置不变。
        // if ( res.message === '删除成功') { //如果成功删除后后台返回的数据是‘删除成功’，可以去点这里的注释
        this.fines = this.fines.filter(h => h !== fine); // 过滤掉已经被删除数据
        this.dataShow = [];
        let startNum = (this.currentPag - 1) * this.pagNums;
        for ( let i = 0; i < this.pagNums; i++, startNum++) {
          if ( this.fines[startNum] !== null && this.fines[startNum] !== undefined) {
            this.dataShow.push(this.fines[startNum]);
          }
        }
      });
  }
}

