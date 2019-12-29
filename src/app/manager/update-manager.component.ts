import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Manager } from '../entity';
import {EntityService} from '../entity.service';

@Component({
  selector: 'app-update-manager',
  templateUrl: './update-manager.component.html',
  styleUrls: ['./update-manager.component.css']
})
export class UpdateManagerComponent implements OnInit {
  @Input() manager: Manager;

  constructor(
    private route: ActivatedRoute,
    private managerService: EntityService,
    private location: Location
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.managerService.getManager(id)
      .subscribe(res => this.manager = res);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (!this.manager.no) {
      alert('no不能为空');
      return;
    } else if (!this.manager.name) {
      alert('name不能为空');
      return;
    }
    this.managerService.updateManager(this.manager)
      .subscribe((res) => {alert(res.message); this.goBack(); });
  }
}
