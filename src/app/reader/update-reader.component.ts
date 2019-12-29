import {Component, OnInit, Input, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {EntityService} from '../entity.service';
import {ReaderType, Reader} from '../entity';
@Component({
  selector: 'app-update-reader',
  templateUrl: './update-reader.component.html',
})
export class UpdateReaderComponent implements OnInit {
  /*定义模块输入，是用来让父级组件向子组件传递内容*/
  @Input() readerTypes: ReaderType[];
  reader: Reader;
  constructor(
    private route: ActivatedRoute,
    private readerService: EntityService,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.getReaderTypes(); // 下拉菜单赋值
    const id = this.route.snapshot.params.id; // 要修改专业的id
    this.readerService.getReader(id)
      .subscribe(res => {
        this.reader = res;
      });
  }
  /*比较器*/
  compareFn(o1: ReaderType, o2: ReaderType): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
  getReaderTypes(): void {
    this.readerService.getReaderTypes()
      .subscribe(res => this.readerTypes = res);
  }
  save(): void { // 多个文本框数据
    /*用于日志信息的一般输出。可以使用此方法使用字符串替换和附加参数。*/
    console.log(this.reader);
    if (!this.reader.no) {
      alert('no不能为空');
      return;
    } else if (!this.reader.name) {
      alert('name不能为空');
      return;
    } else if (!this.reader.age) {
      alert('age不能为空');
      return;
    } else if (!this.reader.phone) {
      alert('phone不能为空');
      return;
    }  else if (!this.reader.readerType) {
      alert('readerType不能为空');
      return;
    }
    this.readerService.updateReader(this.reader)
        .subscribe((res) => {
          alert(res.message);
          this.goBack();
        });
  }

  goBack(): void {
    this.location.back();
  }
}


