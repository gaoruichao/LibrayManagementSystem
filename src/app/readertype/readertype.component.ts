import {Component, DoCheck, OnInit} from '@angular/core';
import {ReaderType} from '../entity';
import {EntityService} from '../entity.service';

@Component({
  selector: 'app-readertype',
  templateUrl: './readertype.component.html',
  styleUrls: ['./readertype.component.css']
})
export class ReadertypeComponent implements OnInit , DoCheck{

  private no: number;
  private dataShow: ReaderType[]; // 分页后在当前页要显示的数据
  public leng: number;                 // 数据总量，需要传给子组件的变量
  public currentPag: number;           // 保存从子组件中传来的当前显示页面
  public pagNums: number;              // 保存从子组件中传来的每页显示数量
  public oldCurrentPag: number;
  public oldPagNums: number;
  private readerTypes: ReaderType[];
  constructor(private readertypeService: EntityService) { }

  ngOnInit() {
    this.getReaderTypes();
  }
  // DoCheck 触发变更检测机制就是调用DoCheck钩子，目的是保证组件属性和浏览器的显示同步
  ngDoCheck(): void {
    if (this.currentPag !== this.oldCurrentPag || this.pagNums !== this.oldPagNums) {
      this.dataShow = [];
      const curren = this.currentPag - 1;
      const pagNum = this.pagNums;
      let startNum = curren * pagNum;
      for ( let i = 0; i < pagNum; i++, startNum++) {
        if ( this.readerTypes[startNum] !== null && this.readerTypes[startNum] !== undefined) {
          this.dataShow.push(this.readerTypes[startNum]);
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
  getReaderTypes(): void {
    this.readertypeService.getReaderTypes()
      .subscribe(res => {this.readerTypes = res; this.leng = res.length; });
  }


  ifName(typeName: string) {
    if (typeName) {
      this.readerTypes.splice(0, this.readerTypes.length)
      this.readertypeService.getReaderTypeByName(typeName)
    .subscribe(res => {this.readerTypes = res;
    });
  } else {
      this.getReaderTypes();
    }
  }

  delete(readerType: ReaderType | number): void {
    this.readerTypes = this.readerTypes.filter(h => h !== readerType);
    this.readertypeService.deleteReaderType(readerType).subscribe(res => alert(res.message));
  }
}
