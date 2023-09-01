import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { BookEffects } from "./book.effects";
import { booksReducer } from "./book.reducers";

@NgModule({
    imports: [
        StoreModule.forFeature('book', booksReducer),
        EffectsModule.forFeature([BookEffects])
    ]
})

export class BookStoreModule{}