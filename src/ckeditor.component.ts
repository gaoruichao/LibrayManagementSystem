import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'my-ckeditor',
  templateUrl: './ckeditor.component.html'
})
export class MyCKEditorComponent implements OnInit {
  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log: string = '';

  // @ts-ignore
  @ViewChild("myckeditor") ckeditor: any;

  constructor() {
    this.mycontent = `<p>合理实用的图书借阅管理系统软件</p>`;
  }

  ngOnInit() {
    this.ckeConfig = {
      allowedContent: true,
      extraPlugins: 'divarea'
    };
  }

  onChange($event: any): void {
    console.log("onChange");
  }
}
