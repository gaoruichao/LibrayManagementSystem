export class Response {
  data: JSON;
  message: string;
}
export class Menu {
  checked: boolean;
  description: string;
  id: number;
  url: string;
}
export class UserRole {
  user: User;
  roles: Role[];
}
export class RoleMenu {
  role: Role;
  menus: Menu[];
}
export class User {
  id: number;
  password: string;
  username: string;
}
export class User1 {
  username: string;
  password: string;
  role: number;
}
export class Role {
  description: string;
  checked: boolean;
  id: number;
}
export class ReaderType {
  id: number;
  typeName: string;
  maxBorrowNum: string;
  limitDate: string;
  no: string;
}
export class BookType {
  id: number;
  typeName: string;
  no: string;
}
export class Reader {
  id: number;
  no: string;
  name: string;
  age: number;
  phone: string;
  date: string;
  readerType: ReaderType;
  borrowedNum: number;
}
export class Book {
  id: number;
  no: string;
  isbn: string;
  bookName: string;
  author: string;
  publish: string;
  publishDate: string;
  unitPrice: number;
  bookType: BookType;
  bookStatus: number;
}
export class Manager {
  id: number;
  no: string;
  name: string;
}
export class BorrowBook {
  id: number;
  no: string;
  borrowDate: string;
  reader: Reader;
  book: Book;
  manager: Manager;
}
export class ReturnBook {
  id: number;
  no: string;
  returnDate: string;
  reader: Reader;
  book: Book;
  borrowBook: BorrowBook;
  manager: Manager;
}
export class BorrowBook1 {
  no: string;
  borrowDate: string;
  reader: Reader;
  book: Book;
  manager: Manager;
}
export class Fine {
  id: number;
  no: string;
  fineAmount: number;
  description: string;
  reader: Reader;
  book: Book;
}
