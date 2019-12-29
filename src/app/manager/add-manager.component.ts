import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {EntityService} from '../entity.service';
import { Manager } from '../entity';

@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.component.html',
  styleUrls: ['./add-manager.component.css']
})
export class AddManagerComponent implements OnInit {
  @Input() manager: Manager;
  constructor(
    private route: ActivatedRoute,
    private managerService: EntityService,
    private location: Location
  ) { }

  ngOnInit() {
  }

  save( no: string, name: string): void { // 多个文本框数据
    this.manager = {id: null, no: no.trim(), name: name.trim()};
    if (!no) {
      alert('no不能为空');
      return; } else if (!name) {
      alert('name不能为空');
      return;
    }
    this.managerService.addManager(this.manager)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
