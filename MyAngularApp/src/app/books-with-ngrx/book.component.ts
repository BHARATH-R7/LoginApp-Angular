import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import { IBook } from "./book.interface";
import * as fromBooks from './index';
import { BookService } from "./book.service";

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
    
    books$!: Observable<IBook[]>;
    isLoading$!: Observable<boolean>;
    startingId : number = 1;
    isFormVisible: boolean = false;
    bookId!: number;
    bookName!: string;

    constructor(private readonly store: Store) { }

    private createIdGenerator = () => {
        this.startingId = this.startingId++;
          return this.startingId++;
      };

    ngOnInit(): void {
        this.initDispatch();
        this.initSubscriptions();
     
    }

    onCreateBook(name: string): void {
        this.store.dispatch(fromBooks.createBook({
            book: {
                id: this.createIdGenerator(),
                name
            }
        }));
    }

    onUpdateBook(id: number, name: string): void {
        let book = {id, name};
        this.store.dispatch(fromBooks.updateBook({book}));
        this.closeEditForm();
    }

    onDeleteBook(book: IBook): void {
        //Step1: Make a Call to both Reducer and Effect for action type: "[Books] DeleteBook"
        console.log('DELETE ID', book)
        this.store.dispatch(fromBooks.deleteBook({book}));
    }

    openEditForm(book: IBook) {
        this.isFormVisible = true;
        this.bookId = book.id;
        this.bookName = book.name;
      }
    
      closeEditForm() {
        this.isFormVisible = false;
      }
    
    private initDispatch(): void {
        this.store.dispatch(fromBooks.getBooks());
    }

    private initSubscriptions(): void {
        //Step7: Final Step fetch books from selector and use it in .html file
        this.books$ = this.store.pipe(select(fromBooks.selectBooksList));
        this.isLoading$ = this.store.pipe(select(fromBooks.selectBookIsLoading));
    }

}