import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, tap } from "rxjs";


@Injectable({providedIn: 'root'})
export class GamesService{
    games = new BehaviorSubject<string[]>(['']);

    constructor(private http: HttpClient, private router: Router) { }

    fetchGames(){
        return this.http.get<string[]>('User/Games')
        .pipe(tap(resData => {
            this.games.next(resData);
        }))
    }

}