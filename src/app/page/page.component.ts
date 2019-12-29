import {Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit, OnChanges, DoCheck {
  @Input()
  private leng: number;    // 数据总数量， @Input()修饰表示父组件传递数据
  @Output()
  currentPag: EventEmitter<number> = new EventEmitter(); // 点击按钮 子组件传递事件给父级组件
  @Output()
  pagNums: EventEmitter<number> = new EventEmitter();
  private pagNum = 5;    // 每页显示数据数量
  private numPag: number;    // 共有几页
  private pags: Array<number>;   // 用于存放全部页码的数组
  private pagCurren = 1;     // 当前页码
  private oldPagNum = 5;

  constructor() { }

  // 默认当前显示页是1，每页显示数量5
  ngOnInit() {
    this.currentPag.emit(this.pagCurren);
    this.pagNums.emit(this.pagNum);

    console.log( 'init,, ' + this.leng + ',,' + this.pags.length);
  }
  // 初始化调用,在init前执行
  ngOnChanges(changes: SimpleChanges): void {
    this.pags = [];  // 这里必须初始化pags数组
    this.numPag = (+this.leng) % (+this.pagNum) === 0 ? (+this.leng) / (+this.pagNum) : Math.floor((+this.leng) / (+this.pagNum)) + 1;
    for ( let i = 1; i <= this.numPag; i++) {
      this.pags.push(i);
    }
    console.log( 'change,, ' + this.leng + ',,' + this.pags.length);
  }
  // 当分页组件中的下拉数据数量发生变化，需要重新改变页码，调用
  ngDoCheck(): void {
    if ( this.pagNum !== this.oldPagNum) {
      this.pagCurren = 1;
      this.currentPag.emit(this.pagCurren);
      this.pagNums.emit(this.pagNum);
      this.oldPagNum = this.pagNum;
      console.log( 'check,, ' + this.leng + ',,' + this.pags.length);
    }
  }

  // 获取每页显示数量函数,下拉菜单用
  gitPagNum() {
    this.pags = [];     // 这里必须初始化pags数组
    this.numPag = (+this.leng) % (+this.pagNum) === 0 ? (+this.leng) / (+this.pagNum) : Math.floor((+this.leng)/(+this.pagNum))+1;
    for ( let i = 1; i <= this.numPag; i++) {
      this.pags.push(i);
    }
  }

  // 获取当前显示页函数，特殊显示
  gitPag(pag) {
    this.pagCurren = pag;
    this.currentPag.emit(this.pagCurren);
    this.pagNums.emit(this.pagNum);
  }

  // 显示下一页函数
  next() {
    if ( this.pagCurren !== this.pags[this.pags.length - 1]) {
      this.pagCurren = this.pagCurren + 1;
    } else {
      this.pagCurren = this.pags[this.pags.length - 1];
    }
    this.currentPag.emit(this.pagCurren);
    this.pagNums.emit(this.pagNum);
  }

  // 显示上一页函数
  previous() {
    if ( this.pagCurren !== 1) {
      this.pagCurren = this.pagCurren - 1;
    } else {
      this.pagCurren = 1;
    }
    this.currentPag.emit(this.pagCurren);
    this.pagNums.emit(this.pagNum);
  }
}

