import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule} from '@angular/forms';
import { HashLocationStrategy, LocationStrategy} from '@angular/common';
import { AppComponent } from './app.component';
import { ReaderComponent } from './reader/reader.component';
import { AddReaderComponent } from './reader/add-reader.component';
import { UpdateReaderComponent } from './reader/update-reader.component';
import { DetailReaderComponent } from './reader/detail-reader.component';
import { AppRoutingModule } from './app-routing.module';
import { PageComponent } from './page/page.component';
import { IndexComponent } from './index/index.component';
import { BooktypeComponent } from './booktype/booktype.component';
import { AddBooktypeComponent } from './booktype/add-booktype.component';
import { UpdateBooktypeComponent } from './booktype/update-booktype.component';
import { UpdateReadertypeComponent } from './readertype/update-readertype.component';
import { AddReadertypeComponent } from './readertype/add-readertype.component';
import { ReadertypeComponent } from './readertype/readertype.component';
import { BookComponent } from './book/book.component';
import { AddBookComponent } from './book/add-Book.component';
import { UpdateBookComponent } from './book/update-Book.component';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ManagerComponent } from './manager/manager.component';
import { AddManagerComponent } from './manager/add-manager.component';
import { UpdateManagerComponent } from './manager/update-manager.component';
import { FineComponent } from './fine/fine.component';
import { UpdateFineComponent } from './fine/update-fine.component';
import { BorrowBookComponent } from './borrow-book/borrow-book.component';
import { AddBorrowBookComponent } from './borrow-book/add-borrow-book.component';
import { UpdateBorrowBookComponent } from './borrow-book/update-borrow-book.component';
import { ReturnBookComponent } from './returnBook/returnBook.component';
import { AddReturnBookComponent } from './returnBook/addReturnBook.component';
import { UpdateReturnBookComponent } from './returnBook/updateReturnBook.component';
import { AdminuserComponent } from './adminuser/adminuser.component';
import { AddAdminuserComponent } from './adminuser/add-adminuser.component';
import { UpdateAdminuserComponent } from './adminuser/update-adminuser.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HighchartsComponent } from './highcharts/highcharts.component';
import {MyCKEditorComponent} from '../ckeditor.component';
import {ChartModule} from 'angular2-highcharts';
import {CKEditorModule} from 'ng2-ckeditor';

declare var require: any;
export function highchartsFactory() {
  const hc = require('highcharts');
  const hm = require('highcharts/highcharts-more');
  const mr = require('highcharts/modules/solid-gauge');
  mr(hc);
  hm(hc);
  return hc;
}
@NgModule({
  declarations: [
    AppComponent,
    ReaderComponent,
    AddReaderComponent,
    UpdateReaderComponent,
    DetailReaderComponent,
    PageComponent,
    IndexComponent,
    BooktypeComponent,
    AddBooktypeComponent,
    UpdateBooktypeComponent,
    UpdateReadertypeComponent,
    AddReadertypeComponent,
    ReadertypeComponent,
    BookComponent,
    AddBookComponent,
    UpdateBookComponent,
    LoginComponent,
    ManagerComponent,
    AddManagerComponent,
    UpdateManagerComponent,
    BorrowBookComponent,
    AddBorrowBookComponent,
    UpdateBorrowBookComponent,
    ReturnBookComponent,
    AddReturnBookComponent,
    UpdateReturnBookComponent,
    FineComponent,
    UpdateFineComponent,
    AdminuserComponent,
    AddAdminuserComponent,
    UpdateAdminuserComponent,
    MyCKEditorComponent,
    AboutusComponent,
    HighchartsComponent,
  ],
  imports: [// 当前项目依赖的所有模块
    ChartModule,
    CKEditorModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // 如果要引入双向绑定，则需要引入FormModule
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([])
  ],
  // 定义服务
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy,
    prototype: LocationStrategy,
    useFactory:  highchartsFactory,
  }],
  // 默认启动哪个组件
  bootstrap: [AppComponent],
})
export class AppModule { }

