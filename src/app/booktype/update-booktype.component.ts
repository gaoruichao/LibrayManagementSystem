import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {BookType} from '../entity';
import {EntityService} from '../entity.service';

@Component({
  selector: 'app-update-booktype',
  templateUrl: './update-booktype.component.html',
  styleUrls: ['./update-booktype.component.css']
})
export class UpdateBooktypeComponent implements OnInit {
  @Input() bookType: BookType;

  constructor(
    private route: ActivatedRoute,
    private bookTypeService: EntityService,
    private location: Location
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.bookTypeService.getBookType(id)
      .subscribe(res => this.bookType = res);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.bookTypeService.updateBookType(this.bookType)
      .subscribe((res) => {alert(res.message); this.goBack(); });
  }

}
