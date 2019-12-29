import {Component, Input, OnInit} from '@angular/core';
import {User} from '../entity';
import {ActivatedRoute} from '@angular/router';
import {EntityService} from '../entity.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-update-adminuser',
  templateUrl: './update-adminuser.component.html',
  styleUrls: ['./update-adminuser.component.css']
})
export class UpdateAdminuserComponent implements OnInit {
  @Input() user: User;
  constructor(private route: ActivatedRoute,
              private entityService: EntityService,
              private location: Location) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.entityService.getUserById(id)
      .subscribe(res => this.user = res);
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.entityService.updateUser(this.user)
      .subscribe((res) => {
        alert( res.message );
        this.goBack();
      });
    this.entityService.setUser(this.user);
  }
}
