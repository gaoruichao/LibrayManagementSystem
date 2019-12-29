import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Reader } from '../entity';
import { EntityService } from '../entity.service';
@Component({
  selector: 'app-detail',
  templateUrl: './detail-reader.component.html',
  styleUrls: ['./detail-reader.component.css']
})
export class DetailReaderComponent implements OnInit {

  @Input() reader: Reader;
  constructor(
    private route: ActivatedRoute,
    private readerService: EntityService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.id; // 要修改专业的id
    this.readerService.getReader(id)
      .subscribe(res => {
        this.reader = res;
      });
  }

  goBack(): void {
    this.location.back();
  }
}
