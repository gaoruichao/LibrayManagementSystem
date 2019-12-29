import { Component, OnInit ,ViewChild} from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log: string = '';

  // @ts-ignore
  @ViewChild("myckeditor") ckeditor: any;

  constructor() { }

  ngOnInit() {
  }

}
