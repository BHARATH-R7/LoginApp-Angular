import { IBook } from "./book.interface";

export interface IBookState{

    books: IBook[];
    isLoading: boolean

}