import {Component, DoCheck, OnInit} from '@angular/core';
import {ReturnBook, User} from '../entity';
import {EntityService} from '../entity.service';

@Component({
  selector: 'app-adminuser',
  templateUrl: './adminuser.component.html',
  styleUrls: ['./adminuser.component.css']
})
export class AdminuserComponent implements OnInit, DoCheck {
  users: User[];
  private dataShow: User[];      // 分页后在当前页要显示的数据
  public leng: number;                 // 数据总量，需要传给子组件的变量
  public currentPag: number;           // 保存从子组件中传来的当前显示页面
  public pagNums: number;              // 保存从子组件中传来的每页显示数量
  public oldCurrentPag: number;
  public oldPagNums: number;
  constructor(private adminuserService: EntityService) { }
  ngOnInit() {
    this.getUsers();
  }
  getUsers(): void {
    this.adminuserService.getUsers()
      .subscribe(res => {this.users = res; this.leng = res.length; });
  }
  delete(user: User| number): void {
    this.users = this.users.filter(h => h !== user);
    if (typeof user !== 'number') {
      this.adminuserService.deleteUser(user.id).subscribe(res => alert(res.message));
    }
  }
  // DoCheck 触发变更检测机制就是调用DoCheck钩子，目的是保证组件属性和浏览器的显示同步
  ngDoCheck(): void {
    if (this.currentPag !== this.oldCurrentPag || this.pagNums !== this.oldPagNums) {
      this.dataShow = [];
      let startNum = (this.currentPag - 1) * this.pagNums;
      for ( let i = 0; i < this.pagNums; i++, startNum++) {
        if ( this.users[startNum] !== null && this.users[startNum] !== undefined) {
          this.dataShow.push(this.users[startNum]);
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
}
