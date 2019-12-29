import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {EntityService} from '../entity.service';

@Component({
  selector: 'app-add-readertype',
  templateUrl: './add-readertype.component.html',
  styleUrls: ['./add-readertype.component.css']
})
export class AddReadertypeComponent implements OnInit {
  @Input() readerType: { no: string; typeName: string; maxBorrowNum: string; limitDate: string };

  constructor(
    private route: ActivatedRoute,
    private readertypeService: EntityService,
    private location: Location
  ) {
  }

  ngOnInit() {
  }

  save(no: string, typeName: string, maxBorrowNum: string, limitDate: string): void { // 多个文本框数据
    this.readerType = {no: no.trim(), typeName: typeName.trim(), maxBorrowNum, limitDate};
    if (!typeName) {
      return;
    }
    this.readertypeService.addReaderType(this.readerType)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}

