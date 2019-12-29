import {Component, Input, OnInit} from '@angular/core';
import {ReaderType} from '../entity';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {EntityService} from '../entity.service';

@Component({
  selector: 'app-update-readertype',
  templateUrl: './update-readertype.component.html',
  styleUrls: ['./update-readertype.component.css']
})
export class UpdateReadertypeComponent implements OnInit {

  @Input() readertype: ReaderType;

  constructor(
    private route: ActivatedRoute,
    private readertypeService: EntityService,
    private location: Location
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.readertypeService.getReaderType(id)
      .subscribe(res => this.readertype = res);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.readertypeService.updateReaderType(this.readertype)
      .subscribe(() => this.goBack());
  }

}
