import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { Observable, tap } from "rxjs";
import { GamesService } from "./games.service";


@Component({
    selector: 'app-games',
    templateUrl: './games.component.html'
})
export class GamesComponent {
    gameslist: string[] = [''];

    constructor(private gamesService: GamesService) { }

    onGames() {
        let gamesObs: Observable<string[]>;
        gamesObs = this.gamesService.fetchGames();
        gamesObs.subscribe({
            next: (res: string[]) => {
                this.gameslist = res;
            },
            error: (err) => {
                console.log('Games Request Error: ', err);
            }
        });
    }

    


}