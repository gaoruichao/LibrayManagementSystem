import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReaderComponent } from './reader/reader.component';
import { AddReaderComponent } from './reader/add-reader.component';
import { UpdateReaderComponent } from './reader/update-reader.component';
import { DetailReaderComponent } from './reader/detail-reader.component';
import { IndexComponent } from './index/index.component';
import { PageComponent } from './page/page.component';
import {BooktypeComponent} from './booktype/booktype.component';
import {ReadertypeComponent} from './readertype/readertype.component';
import {AddBooktypeComponent} from './booktype/add-booktype.component';
import {AddReadertypeComponent} from './readertype/add-readertype.component';
import {UpdateBooktypeComponent} from './booktype/update-booktype.component';
import {UpdateReadertypeComponent} from './readertype/update-readertype.component';
import { BookComponent } from './book/book.component';
import { AddBookComponent } from './book/add-Book.component';
import { UpdateBookComponent } from './book/update-Book.component';
import { LoginComponent } from './login/login.component';
import {ManagerComponent} from './manager/manager.component';
import { AddManagerComponent } from './manager/add-manager.component';
import {UpdateManagerComponent} from './manager/update-manager.component';
import { FineComponent } from './fine/fine.component';
import { UpdateFineComponent } from './fine/update-fine.component';
import { BorrowBookComponent } from './borrow-book/borrow-book.component';
import { AddBorrowBookComponent } from './borrow-book/add-borrow-book.component';
import { UpdateBorrowBookComponent } from './borrow-book/update-borrow-book.component';
import { ReturnBookComponent } from './returnBook/returnBook.component';
import { AddReturnBookComponent } from './returnBook/addReturnBook.component';
import { UpdateReturnBookComponent } from './returnBook/updateReturnBook.component';
import {AdminuserComponent} from './adminuser/adminuser.component';
import {UpdateAdminuserComponent} from './adminuser/update-adminuser.component';
import {AddAdminuserComponent} from './adminuser/add-adminuser.component';
import {HighchartsComponent} from './highcharts/highcharts.component';
import {AboutusComponent} from './aboutus/aboutus.component';

const routes: Routes = [
  {path: '', component: LoginComponent, pathMatch: 'full'}, // 默认路由(登录)
  {path: 'index', component: IndexComponent, children: [// 嵌套路由
    { path: 'reader', component: ReaderComponent},
    { path: 'add-reader', component: AddReaderComponent},
    { path: 'update-reader/:id', component: UpdateReaderComponent},
    { path: 'detail-reader/:id', component: DetailReaderComponent},
    { path: 'bookType', component: BooktypeComponent},
    { path: 'readerType', component: ReadertypeComponent},
    { path: 'addBookType', component: AddBooktypeComponent},
    { path: 'addReaderType', component: AddReadertypeComponent},
    { path: 'updateBookType/:id', component: UpdateBooktypeComponent},
    { path: 'updateReaderType/:id', component: UpdateReadertypeComponent},
    { path: 'book', component: BookComponent},
    { path: 'addBook', component: AddBookComponent},
    { path: 'updateBook/:id', component: UpdateBookComponent},
    { path: 'manager', component: ManagerComponent},
    { path: 'addManager', component: AddManagerComponent},
    { path: 'updateManager/:id', component: UpdateManagerComponent},
    { path: 'page', component: PageComponent},
    { path: 'fine', component: FineComponent},
    { path: 'update-fine/:id', component: UpdateFineComponent},
      { path: 'borrow-book', component: BorrowBookComponent},
      { path: 'add-borrow-book', component: AddBorrowBookComponent},
      { path: 'update-borrow-book/:id', component: UpdateBorrowBookComponent},
      { path: 'returnBook', component: ReturnBookComponent},
      { path: 'addReturnBook', component: AddReturnBookComponent},
      { path: 'updateReturnBook/:id', component: UpdateReturnBookComponent},
      {path: 'adminuser', component: AdminuserComponent},
      { path: 'updateAdminUser/:id', component: UpdateAdminuserComponent},
      { path: 'addAdminUser', component: AddAdminuserComponent},
      { path: 'aboutUs', component: AboutusComponent},
      { path: 'highCharts', component: HighchartsComponent},
  ]},
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
