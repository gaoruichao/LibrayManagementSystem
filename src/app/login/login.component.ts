import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { EntityService } from '../entity.service';
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private uname: string;
  private password: string;
  userName: string;

  constructor(private router: Router, private loginService: EntityService) { }

  ngOnInit() { // 组件被创建
  }
  login(un: string, up: string) { // 登录跳转页面
    this.uname = un ;
    this.password = up;
    if (this.uname === '' || this.password === '') {
      alert('请输入账号或密码');
    }
    this.loginService.login({username: this.uname, password: this.password})
      .subscribe((res) => {
        if (res.username) {
          window.localStorage.setItem('userName', res.username);
          this.loginService.setUser(res);
          this.router.navigateByUrl('/index');
        } else {
          alert(res.message);
        }
      });
  }
}
