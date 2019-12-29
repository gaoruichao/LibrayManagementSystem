import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import {EntityService} from '../entity.service';
@Component({
  selector: 'app-add-booktype',
  templateUrl: './add-booktype.component.html',
  styleUrls: ['./add-booktype.component.css']
})
export class AddBooktypeComponent implements OnInit {
  @Input() bookType: { no: string; typeName: string };
  constructor(
    private route: ActivatedRoute,
    private bookTypeService: EntityService,
    private location: Location
  ) {}
  ngOnInit() {
  }
  save(no: string, typeName: string): void { // 多个文本框数据
    this.bookType = {no: no.trim(), typeName: typeName.trim()};
    if (!typeName) { return; }
    this.bookTypeService.addBookType(this.bookType)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
