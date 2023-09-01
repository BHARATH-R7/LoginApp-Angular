import { Action, createReducer, on } from "@ngrx/store";

import { IBookState } from "./book.model";
import * as fromBooks from './index';


//initial state shd always be a JS object
//Inside JS object we assign values with :
//There is nothing like TS object
export const initialState: IBookState = {
    books: [],
    isLoading: false
}

const reducer = createReducer<IBookState>(
    initialState,
    on(fromBooks.getBooks, (state) => {
        return {
            ...state,
            isLoading: true
        }
    }),
    on(fromBooks.getBooksSuccess, (state, { books }) => {
        return {
            ...state,
            isLoading: false,
            books
        }
    }),
    on(fromBooks.createBook, (state) => {
        console.log('STEP1', state);
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromBooks.createBookSuccess, (state, { book }) => {
        console.log('STEP2', book);
        return {
            ...state,
            books: [...state.books, book],
            isLoading: false,
        };
    }),
    on(fromBooks.updateBook, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromBooks.updateBookSuccess, (state, { book }) => {
        return {
            ...state,
            books: state.books.map((b) => b.id === book.id ? book : b),
            isLoading: false,
        };
    }),
    //Step2: Call came from book.component.ts, that's all there is no further call from here...
    on(fromBooks.deleteBook, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    //Step4: call came from book.effects.ts
    on(fromBooks.deleteBookSuccess, (state, { book }) => {
        console.log('DELETE: ', book);
        return {
            ...state,
            isLoading: false,
            //Step5: Removed book from books property, now new state of books is available in store
            //Check in Selector
             books: state.books.filter((b) => b.id !== book.id)
        };
    })
);


export function booksReducer(state = initialState, actions: Action): IBookState{
return reducer(state, actions);
}