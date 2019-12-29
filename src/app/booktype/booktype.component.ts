import {Component, DoCheck, OnInit} from '@angular/core';
import {BookType} from '../entity';
import {EntityService} from '../entity.service';
import {any} from "codelyzer/util/function";

@Component({
  selector: 'app-booktype',
  templateUrl: './booktype.component.html',
  styleUrls: ['./booktype.component.css']
})
export class BooktypeComponent implements OnInit , DoCheck{
  private no: number;
  private bookTypes: BookType[];
  private dataShow: BookType[]; // 分页后在当前页要显示的数据
  public leng: number;                 // 数据总量，需要传给子组件的变量
  public currentPag: number;           // 保存从子组件中传来的当前显示页面
  public pagNums: number;              // 保存从子组件中传来的每页显示数量
  public oldCurrentPag: number;
  public oldPagNums: number;
  constructor(private booktypeService: EntityService) { }

  ngOnInit() {
    this.getBookTypes();
  }
  // DoCheck 触发变更检测机制就是调用DoCheck钩子，目的是保证组件属性和浏览器的显示同步
  ngDoCheck(): void {
    if (this.currentPag !== this.oldCurrentPag || this.pagNums !== this.oldPagNums) {
      this.dataShow = [];
      const curren = this.currentPag - 1;
      const pagNum = this.pagNums;
      let startNum = curren * pagNum;
      for ( let i = 0; i < pagNum; i++, startNum++) {
        if ( this.bookTypes[startNum] !== null && this.bookTypes[startNum] !== undefined) {
          this.dataShow.push(this.bookTypes[startNum]);
        }
      }
      this.oldCurrentPag = this.currentPag;
      this.oldPagNums = this.pagNums;
    }
  }
// 捕获当前显示页码函数
  currentPagHandel(pag: number) {
    this.currentPag = pag;
  }
  // 捕获每页显示数量行数
  pagNumsHandel(pagNum: number) {
    this.pagNums = pagNum;
  }
  getBookTypes(): void {
    this.booktypeService.getBookTypes ()
      .subscribe(res => { this.bookTypes = res; this.leng = res.length; });
  }

  ifName(typeName: string) {
    if (typeName) {
      this.bookTypes.splice(0, this.bookTypes.length)
      this.booktypeService.getBookTypeByName(typeName)
        .subscribe(res => {this.bookTypes = res;
        });
    } else {
      this.getBookTypes();
    }
  }

  delete(bookType: BookType | number): void {
    this.bookTypes = this.bookTypes.filter(h => h !== bookType);
    this.booktypeService.deleteBookType(bookType).subscribe(res => alert(res.message));
  }

}
