import { Component, OnInit } from '@angular/core';
import {Menu, Role, User} from '../entity';
import {EntityService} from '../entity.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  user: User;
  menus: Menu[];
  roles: Role[];
  // user = window.localStorage.getItem('userName');
  constructor(private indexService: EntityService) { }
  ngOnInit() {
    // 通过登录响应的user初始化user对象
    this.user = this.indexService.getUser();
    // 通过登录用户的id获得对应的所有菜单
    this.indexService.getMenusByUserId(this.user.id).subscribe(res => this.menus = res);
    this.indexService.getRolesByUserId(this.user.id).subscribe( res => this.roles = res);
  }
}
