import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User1} from '../entity';
import {EntityService} from '../entity.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-adminuser',
  templateUrl: './add-adminuser.component.html',
  styleUrls: ['./add-adminuser.component.css']
})
export class AddAdminuserComponent implements OnInit {
  shop = [
    {id: '普通管理员'},
    {id: '管理员'}
  ];
  contain: string;
  constructor(private route: ActivatedRoute,
              private entityService: EntityService,
              private location: Location) { }
  @Input() user1: User1;
  flag: number;
  ngOnInit() {
    this.flag = 3;
  }
  compareFn(o1: object , o2: object): boolean {
    return true;
  }
  save(username: string, password: string,  contain1: string): void { // 多个文本框数据
                                                                                  //  alert(contain1);
    if (contain1 === '普通管理员' ) {
      this.flag = 2;
    }
    if (contain1 === '管理员' ) {
      this.flag = 1;
    }
    this.user1 = { username: username.trim(), password: password.trim(),  role: this.flag };
    if (this.flag === 3) {
      alert('请选择角色');
      return;
    }
    this.entityService.addUser(this.user1)
      .subscribe(
        (res) => {
          alert(res.message);
          this.goBack();
        }
      );
  }
  goBack(): void {
    this.location.back();
  }
}
