import { createAction, props } from '@ngrx/store';

import { IBook } from './book.interface';

const prefix = '[Books]';

export const getBooks = createAction(`${prefix} GetBooks`);
export const getBooksSuccess = createAction(
    //" '[Books]' GetBooks Success "
    `${getBooks.type} Success`,
    props<{
        books: IBook[];
    }>()
);


export const createBook = createAction(
    `${prefix} CreateBook`,
    props<{
        book: IBook
    }>()
);
export const createBookSuccess = createAction(
    `${createBook.type} Success`,
    props<{
        book: IBook
    }>()
);

export const updateBook = createAction(
    `${prefix} UpdateBook`,
    props<{
        book: IBook
    }>()
);
export const updateBookSuccess = createAction(
    `${updateBook.type} Success`,
    props<{
        book: IBook
    }>()
);


export const deleteBook = createAction(
    `${prefix} DeleteBook`,
    props<{
        book: IBook
    }>()
);
export const deleteBookSuccess = createAction(
    `${deleteBook.type} Success`,
    props<{
        book: IBook
    }>()
);


