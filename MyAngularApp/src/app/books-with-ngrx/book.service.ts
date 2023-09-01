import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { IBook } from "./book.interface";
import { HttpClient } from "@angular/common/http";
import { CrudBook } from "../models/crudbook";

@Injectable({
    providedIn: 'root'
})
export class BookService {

    constructor(private http: HttpClient){}

    getBooks(): Observable<IBook[]> {
        return this.http.get<CrudBook[]>(`crudbook/get`);
    }

    create(newBook: IBook): Observable<IBook> {
        return this.http.post<IBook>(`crudbook/post`, newBook);
    }

    update(upBook: IBook): Observable<IBook> {
        return this.http.put<IBook>(`crudbook/put/${upBook.id}`, upBook);

    }

    delete(delBook: IBook): Observable<IBook> {
        return this.http.delete<IBook>(`crudbook/delete/${delBook.id}`);
    }

}