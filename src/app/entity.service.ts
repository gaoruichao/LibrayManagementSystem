import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {User, Reader, Book, ReaderType, BookType, Manager, BorrowBook, ReturnBook, Fine, Response, Role, Menu, User1} from './entity';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class EntityService {
  public user: User;
  response: Response;
  private readerTypeUrl = 'http://localhost:8080/readerType.ctl';
  private bookTypeUrl = 'http://localhost:8080/bookType.ctl';
  private readerUrl = 'http://localhost:8080/reader.ctl';  /*sevlet的相对路径*/
  private bookUrl = 'http://localhost:8080/book.ctl';
  private managerUrl = 'http://localhost:8080/manager.ctl';
  private borrowBookUrl = 'http://localhost:8080/borrowBook.ctl';
  private returnBookUrl = 'http://localhost:8080/returnBook.ctl';
  private fineUrl = 'http://localhost:8080/fine.ctl';

  private loginUrl = 'http://localhost:8080/login.ctl';
  private menuUrl = 'http://localhost:8080/menu.ctl';
  private roleUrl = 'http://localhost:8080/role.ctl';
  private userUrl = 'http://localhost:8080/user.ctl';
  constructor(private http: HttpClient) { }
  getUser() {
    return this.user;
  }
  setUser(user) {
    this.user = user;
  }
  // 验证登录用户账号密码是否正确
  checkUser(user: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(this.userUrl, user);
  }
  /** GET degrees from the server */
  getReaderTypes(): Observable<ReaderType[]> {
    return this.http.get<ReaderType[]>(this.readerTypeUrl )
      .pipe(
        catchError(this.handleError<ReaderType[]>('getReaderTypes', []))
      );
  }
  /** GET degree by id. Will 404 if id not found */
  getReaderType(id: number): Observable<ReaderType> {
    const url = this.readerTypeUrl + '?id=' + id;
    return this.http.get<ReaderType>(url).pipe(
      catchError(this.handleError<ReaderType>(`getReaderType id=${id}`))
    );
  }
  getReaderTypeByName(typeName: string): Observable<ReaderType[]> {
    const url = this.readerTypeUrl + '?typeName=' + typeName;
    return this.http.get<ReaderType[]>(url).pipe();
  }
  /** POST: add a new degree to the server */
  addReaderType(readerType: {no: string, typeName: string, maxBorrowNum: string, limitDate: string }): Observable<Response> {
    return this.http.post<Response>(this.readerTypeUrl, readerType, httpOptions).pipe(
      catchError(this.handleError<any>('addReaderType'))
    );
  }

  /** DELETE: delete the degree from the server */
  deleteReaderType(readerType: ReaderType | number): Observable<Response> {
    const id = typeof readerType === 'number' ? readerType : readerType.id;
    return this.http.delete<Response>(this.readerTypeUrl + '?id=' + id, httpOptions).pipe(
      catchError(this.handleError<Response>('deleteReaderType'))
    );
  }
  // update方法
  /** PUT: update the degree on the server */
  updateReaderType(readerType: ReaderType): Observable<Response> {
    return this.http.put<Response>(this.readerTypeUrl, readerType, httpOptions).pipe(
      catchError(this.handleError<Response>('updateReaderType'))
    );
  }



  /** GET degrees from the server */
  getBookTypes(): Observable<BookType[]> {
    return this.http.get<BookType[]>(this.bookTypeUrl )
      .pipe(
        catchError(this.handleError<BookType[]>('getBookTypes', []))
      );
  }
  /** GET degree by id. Will 404 if id not found */
  getBookType(id: number): Observable<BookType> {
    const url = this.bookTypeUrl + '?id=' + id;
    return this.http.get<BookType>(url).pipe(
      catchError(this.handleError<BookType>(`getBookType id=${id}`))
    );
  }
  getBookTypeByName(typeName: string): Observable<BookType[]> {
    const url = this.bookTypeUrl + '?typeName=' + typeName;
    return this.http.get<BookType[]>(url).pipe();
  }
  /** POST: add a new degree to the server */
  addBookType(bookType: {typeName: string }): Observable<Response> {
    return this.http.post<Response>(this.bookTypeUrl, bookType, httpOptions).pipe(
      catchError(this.handleError<any>('addBookType'))
    );
  }

  /** DELETE: delete the degree from the server */
  deleteBookType(bookType: BookType | number): Observable<Response> {
    const id = typeof bookType === 'number' ? bookType : bookType.id;
    return this.http.delete<Response>(this.bookTypeUrl + '?id=' + id, httpOptions).pipe(
      catchError(this.handleError<Response>('deleteBookType'))
    );
  }
  // update方法
  /** PUT: update the degree on the server */
  updateBookType(bookType: BookType): Observable<Response> {
    return this.http.put<Response>(this.bookTypeUrl, bookType, httpOptions).pipe(
      catchError(this.handleError<Response>('updateBookType'))
    );
  }
  /** GET readers from the server */
  getReaders(): Observable<Reader[]> {
    return this.http.get<Reader[]>(this.readerUrl + ' ')
      .pipe(
        catchError(this.handleError<Reader[]>('getReaders', []))
      );
  }
  /** GET reader by id. Will 404 if id not found */
  getReader(id: number): Observable<Reader> {
    const url = this.readerUrl + '?id=' + id;
    return this.http.get<Reader>(url).pipe(
      catchError(this.handleError<Reader>(`getReader id=${id}`))
    );
  }
  selectReader(name: string): Observable<Reader[]> {
    return  this.http.get<Reader[]>(this.readerUrl + '?name=' + name)
      .pipe(
        catchError(this.handleError<Reader[]>('getReaders', []))
      );
  }
  selectFine(name: string): Observable<Fine[]> {
    return  this.http.get<Fine[]>(this.fineUrl + '?readerName=' + name)
      .pipe(
        catchError(this.handleError<Fine[]>('getFines', []))
      );
  }
  selectBorrowBook(name: string): Observable<BorrowBook[]> {
    return  this.http.get<BorrowBook[]>(this.borrowBookUrl + '?readerName=' + name)
      .pipe(
        catchError(this.handleError<BorrowBook[]>('getBorrowBooks', []))
      );
  }
  selectReturnBook(name: string): Observable<ReturnBook[]> {
    return  this.http.get<ReturnBook[]>(this.returnBookUrl + '?readerName=' + name)
      .pipe(
        catchError(this.handleError<ReturnBook[]>('getReturnBooks', []))
      );
  }
  /** POST: add a new reader to the server */
  addReader(reader: { no: string; name: string; age: number; phone: string; readerType: ReaderType }): Observable<Response> {
    return this.http.post<Response>(this.readerUrl + ' ', reader, httpOptions).pipe(
      catchError(this.handleError<any>('addReader'))
    );
  }
  /** DELETE: delete the reader from the server */
  deleteReader(reader: Reader | number): Observable<Response> {
    const id = typeof reader === 'number' ? reader : reader.id;
    return this.http.delete<Response>(this.readerUrl + '?id=' + id, httpOptions).pipe(
      catchError(this.handleError<Response>('deleteReader'))
    );
  }

  /** PUT: update the hero on the server */
  updateReader(reader: Reader): Observable<Response> {
    return this.http.put<Response>(this.readerUrl + ' ', reader, httpOptions).pipe(
      catchError(this.handleError<Response>('updateReader'))
    );
  }
  /** GET books from the server */
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.bookUrl + ' ')
      .pipe(
        catchError(this.handleError<Book[]>('getBooks', []))
      );
  }
  /** GET book by id. Will 404 if id not found */
  getBook(id: number): Observable<Book> {
    const url = this.bookUrl + '?id=' + id;
    return this.http.get<Book>(url).pipe(
      catchError(this.handleError<Book>(`getBook id=${id}`))
    );
  }

  /** POST: add a new college to the server */
  addBook(book: {no: string,
    isbn: string,
    bookName: string,
    author: string,
    publish: string,
    publishDate: string,
    unitPrice: number,
    bookType: BookType,
    bookStatus: number }): Observable<Response> {
    return this.http.post<Response>(this.bookUrl + ' ', book, httpOptions).pipe(
      catchError(this.handleError<any>('addBook'))
    );
  }
  getBookByName(name: string): Observable<Book[]> {
    const url = this.bookUrl + '?bookName=' + name;
    return this.http.get<Book[]>(url).pipe(
      catchError(this.handleError<Book[]>(`getBookByName name=${name}`))
    );
  }
  /** DELETE: delete the college from the server */
  deleteBook(book: Book | number): Observable<Response> {
    const id = typeof book === 'number' ? book : book.id;
    return this.http.delete<Response>(this.bookUrl + '?id=' + id, httpOptions).pipe(
      catchError(this.handleError<Response>('deleteBook'))
    );
  }

  /** PUT: update the hero on the server */
  updateBook(book: Book): Observable<Response> {
    return this.http.put<Response>(this.bookUrl + ' ', book, httpOptions).pipe(
      catchError(this.handleError<Response>('updateBook'))
    );
  }
  /** GET heroes from the server */
  getManagers(): Observable<Manager[]> {
    return this.http.get<Manager[]>(this.managerUrl )
      .pipe(
        catchError(this.handleError<Manager[]>('getManagers', []))
      );
  }
  deleteManager(manager: Manager | number): Observable<Response> {
    const id = typeof manager === 'number' ? manager : manager.id;
    return this.http.delete<Response>(this.managerUrl + '?id=' + id, httpOptions).pipe(
      catchError(this.handleError<Response>('deleteManager'))
    );
  }
  /** POST: add a new manager to the server */
  addManager(manager: { name: string; no: string}): Observable<Response> {
    return this.http.post<Response>(this.managerUrl, manager, httpOptions).pipe(
      catchError(this.handleError<any>('addManager'))
    );
  }
  /** GET manager by id. Will 404 if id not found */
  getManager(id: number): Observable<Manager> {
    const url = this.managerUrl + '?id=' + id;
    return this.http.get<Manager>(url).pipe(
      catchError(this.handleError<Manager>(`getManager id=${id}`))
    );
  }
  getManagerByname(name: string): Observable<Manager[]> {
    const url = this.managerUrl + '?name=' + name;
    return this.http.get<Manager[]>(url).pipe(
      catchError(this.handleError<Manager[]>(`getManagerByname name=${name}`))
    );
  }
  updateManager(manager: Manager): Observable<Response> {
    return this.http.put<Response>(this.managerUrl, manager, httpOptions).pipe(
      catchError(this.handleError<Response>('updateManager'))
    );
  }
  /** GET teachers from the server */
  getBorrowBooks(): Observable<BorrowBook[]> {
    return this.http.get<BorrowBook[]>(this.borrowBookUrl + ' ')
      .pipe(
        catchError(this.handleError<BorrowBook[]>('getBorrowBooks', []))
      );
  }

  getReturnBooks(): Observable<ReturnBook[]> {
    return this.http.get<ReturnBook[]>(this.returnBookUrl + ' ')
      .pipe(
        catchError(this.handleError<ReturnBook[]>('getReturnBooks', []))
      );
  }
  getBorBook(id: number): Observable<BorrowBook[]> {
    const url = this.borrowBookUrl + '?paraType=Book&id=' + id;
    return this.http.get<BorrowBook[]>(url).pipe(
      catchError(this.handleError<BorrowBook[]>(`getBorBook book id = ${id}`))
    );
  }
  getReturnBook(id: number): Observable<ReturnBook> {
    const url = this.returnBookUrl + '?id=' + id;
    return this.http.get<ReturnBook>(url).pipe(
      catchError(this.handleError<ReturnBook>(`getReturnBook id=${id}`))
    );
  }
  /** GET teacher by id. Will 404 if id not found */
  getBorrowBook(id: number): Observable<BorrowBook> {
    const url = this.borrowBookUrl + '?id=' + id;
    return this.http.get<BorrowBook>(url).pipe(
      catchError(this.handleError<BorrowBook>(`getBorrowBook id=${id}`))
    );
  }
  /** POST: add a new teacher to the server */
  addBorrowBook(borrowBook: { no: string; reader: Reader; book: Book; manager: Manager}): Observable<Response> {
    return this.http.post<Response>(this.borrowBookUrl + ' ', borrowBook, httpOptions).pipe(
      catchError(this.handleError<any>('addBorrowBook'))
    );
  }
  /** POST: add a new teacher to the server */
  // tslint:disable-next-line:max-line-length
  addReturnBook(returnBook: { no: string;  reader: Reader; book: Book; borrowBook: BorrowBook; manager: Manager}): Observable<Response> {
    return this.http.post<Response>(this.returnBookUrl + ' ', returnBook, httpOptions).pipe(
      catchError(this.handleError<any>('addReturnBook'))
    );
  }

  /** DELETE: delete the teacher from the server */
  deleteBorrowBook(borrowBook: BorrowBook | number): Observable<Response> {
    const id = typeof borrowBook === 'number' ? borrowBook : borrowBook.id;
    return this.http.delete<Response>(this.borrowBookUrl + '?id=' + id, httpOptions).pipe(
      catchError(this.handleError<Response>('deleteBorrowBook'))
    );
  }
  /** DELETE: delete the teacher from the server */
  deleteReturnBook(returnBook: ReturnBook | number): Observable<Response> {
    const id = typeof returnBook === 'number' ? returnBook : returnBook.id;
    return this.http.delete<Response>(this.returnBookUrl + '?id=' + id, httpOptions).pipe(
      catchError(this.handleError<Response>('deleteReturnBook'))
    );
  }

  /** PUT: update the hero on the server */
  updateBorrowBook(borrowBook: BorrowBook): Observable<Response> {
    return this.http.put<Response>(this.borrowBookUrl + ' ', borrowBook, httpOptions).pipe(
      catchError(this.handleError<Response>('updateBorrowBook'))
    );
  }
  /** PUT: update the hero on the server */
  updateReturnBook(returnBook: ReturnBook): Observable<Response> {
    return this.http.put<Response>(this.returnBookUrl + ' ', returnBook, httpOptions).pipe(
      catchError(this.handleError<Response>('updateReturnBook'))
    );
  }
  /** GET fines from the server */
  getFines(): Observable<Fine[]> {
    return this.http.get<Fine[]>(this.fineUrl + ' ')
      .pipe(
        catchError(this.handleError<Fine[]>('getFines', []))
      );
  }
  /** GET fine by id. Will 404 if id not found */
  getFine(id: number): Observable<Fine> {
    const url = this.fineUrl + '?id=' + id;
    return this.http.get<Fine>(url).pipe(
      catchError(this.handleError<Fine>(`getFine id=${id}`))
    );
  }
  /** DELETE: delete the fine from the server */
  deleteFine(fine: Fine | number): Observable<Response> {
    const id = typeof fine === 'number' ? fine : fine.id;
    return this.http.delete<Response>(this.fineUrl + '?id=' + id, httpOptions).pipe(
      catchError(this.handleError<Response>('deleteFine'))
    );
  }

  /** PUT: update the hero on the server */
  updateFine(fine: Fine): Observable<Response> {
    return this.http.put<Response>(this.fineUrl + ' ', fine, httpOptions).pipe(
      catchError(this.handleError<Response>('updateFine'))
    );
  }
  /**
   * Handle Http operation that failed.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
getMenusByUserId(id: number): Observable<Menu[]> {
  return this.http.get<Menu[]>(this.menuUrl + '?user_id=' + id).pipe();
}
getMenusByRoleId(id: number): Observable<Menu[]> {
  return this.http.get<Menu[]>(this.menuUrl + '?role_id=' + id).pipe();
}
getRolesByUserId(id: number): Observable<Role[]> {
  return this.http.get<Role[]>(this.roleUrl + '?user_id=' + id).pipe();
}
getAllRoles(): Observable<Role[]> {
  return this.http.get<Role[]>(this.roleUrl);
}
getUsers(): Observable<User[]> {
  return this.http.get<User[]>(this.userUrl).pipe();
}
login(user: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(this.loginUrl, user);
}
setRole(userRole: { user: User, roles: Role[]}): Observable<any> {
  return this.http.post<any>(this.roleUrl, userRole).pipe();
}
  addUser(user1: User1): Observable<Response> {
    return this.http.post<Response>(this.userUrl, user1 , httpOptions).pipe();
  }
  deleteUser(id: number): Observable<Response> {
    return this.http.delete<Response>(this.userUrl + '?user_id=' + id, httpOptions).pipe();
  }
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.userUrl + '?user_id=' + id).pipe();
  }
  updateUser(user: User): Observable<Response> {
    return this.http.put<Response>(this.userUrl, user , httpOptions).pipe();
  }
}

