import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IBookState } from './book.model';

export const selectBookState = createFeatureSelector<IBookState>('book');
//Step6: Take all the books and assign it to selectBooksList
//Check in book.component.ts
export const selectBooksList = createSelector(selectBookState, (state) => state.books);
export const selectBookIsLoading = createSelector(selectBookState, (state) => state.isLoading);