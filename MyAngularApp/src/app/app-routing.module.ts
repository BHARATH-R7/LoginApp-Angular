import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { AuthComponent } from "./auth/auth.component";
import { AboutComponent } from "./about/about.component";
import { AuthGuard } from "./auth/auth.guard";
import { GamesComponent } from "./games/games.component";
import { BookComponent } from "./books-with-ngrx/book.component";
import { NotFoundComponent } from "./not-found/not-found.component";


const appRoutes: Routes = [
    //If the path is localhost:4200 it will redirect to localhost:4200/auth
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: 'about', component: AboutComponent },
    {
        path: 'games',
        canActivate: [AuthGuard],
        component: GamesComponent,
    },
    { path: 'auth', component: AuthComponent },
    {
        path: 'crud',
        canActivate: [AuthGuard],
        loadChildren: () => import("./users/user.module").then(m => m.UserModule) //lazy loading
    },
    { path: 'crud/book/get', component: BookComponent },
    // The wildcard route should be the last route
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes,
        { preloadingStrategy: PreloadAllModules }
    )],
    exports: [RouterModule]
})
export class AppRoutingModule { }
