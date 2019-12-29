import {Component, OnInit, DoCheck, Output, KeyValueDiffers} from '@angular/core';
import { Reader } from '../entity';
import {EntityService} from '../entity.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
@Component({
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit, DoCheck {
  private readers: Reader[];   // 获取到的全部数据
  private dataShow: Reader[];      // 分页后在当前页要显示的数据
  public leng: number;                 // 数据总量，需要传给子组件的变量
  public currentPag: number;           // 保存从子组件中传来的当前显示页面
  public pagNums: number;              // 保存从子组件中传来的每页显示数量
  public oldCurrentPag: number;
  public oldPagNums: number;
  private id: number;
  search: Reader;
  datas: Array<Reader>;
  constructor(
    private readerService: EntityService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }
  ngOnInit() {
    this.getReaders();
  }

  Number(value: string) {
    return parseInt(value, 10);
  }
  select(name: string): void {
    if (name === null) {
      this.readerService.getReaders().subscribe(res => this.dataShow = res);
      return;
    }
    this.readerService.selectReader(name).subscribe(res => this.dataShow = res);
  }
  // DoCheck 触发变更检测机制就是调用DoCheck钩子，目的是保证组件属性和浏览器的显示同步
  ngDoCheck(): void {
    if (this.currentPag !== this.oldCurrentPag || this.pagNums !== this.oldPagNums) {
      this.dataShow = [];
      let startNum = (this.currentPag - 1) * this.pagNums;
      for ( let i = 0; i < this.pagNums; i++, startNum++) {
        if ( this.readers[startNum] !== null && this.readers[startNum] !== undefined) {
          this.dataShow.push(this.readers[startNum]);
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
  // 获取所有Reader数据
  getReaders(): void {
    this.readerService.getReaders ()
      .subscribe(res => {this.readers = res; this.leng = res.length; });
  }
  delete(reader: Reader | number): void {
    this.readerService.deleteReader(reader)
      .subscribe(res => {
        alert( res. message ); // 弹出后台给的消息
        // 以下代码用于成果删除一行数据后页面内容刷新，并将页面保持在原页数位置不变。
        // if ( res.message === '删除成功') { //如果成功删除后后台返回的数据是‘删除成功’，可以去点这里的注释
        this.readers = this.readers.filter(h => h !== reader); // 过滤掉已经被删除数据
        this.dataShow = [];
        let startNum = (this.currentPag - 1) * this.pagNums;
        for ( let i = 0; i < this.pagNums; i++, startNum++) {
          if ( this.readers[startNum] !== null && this.readers[startNum] !== undefined) {
            this.dataShow.push(this.readers[startNum]);
          }
        }
      });
  }

  private doSomethingIfProp1Change() {
  }
}

