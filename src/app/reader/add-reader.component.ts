import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {EntityService} from '../entity.service';
import {ReaderType, Reader} from '../entity';
@Component({
  selector: 'app-add-reader',
  templateUrl: './add-reader.component.html',
  styleUrls: ['./add-reader.component.css']
})
export class AddReaderComponent implements OnInit {
  @Input() readerTypes: ReaderType[];
  reader: { no: string; name: string; age: number; phone: string; readerType: ReaderType };
  readerType: ReaderType;
  constructor(
    private route: ActivatedRoute,
    private readerService: EntityService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getReaderTypes() ;
  }
  getReaderTypes(): void {
    this.readerService.getReaderTypes()
      .subscribe(res => this.readerTypes = res);
  }

  save(no: string, name: string, age: number, phone: string, readerType: ReaderType): void { // 多个文本框数据
    this.reader = {no: no.trim(), name: name.trim(), age: age.valueOf(), phone: phone.trim(), readerType: this.readerType};
    if (!no) {
      alert('no不能为空');
      return; } else if (!name) {
      alert('name不能为空');
      return;
    } else if (!age) {
      alert('age不能为空');
      return;
    } else if (!phone) {
      alert('phone不能为空');
      return;
    }  else if (!readerType) {
      alert('readerType不能为空');
      return;
    }
    this.readerService.addReader(this.reader)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
  Number(value: string) {
    return parseInt(value, 10);
  }
  Date(value: string) {
    return;
  }
}

