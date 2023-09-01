import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthResponseData, AuthService } from "../auth/auth.service";
import { BehaviorSubject, Subscription } from "rxjs";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
    underline = false;
    isLoggedIn: boolean = false;
    private userSub: Subscription | null = null;

    constructor(private authService: AuthService){

    }

    ngOnInit(): void {
       this.userSub = this.authService.authResData.subscribe( authResData => {
       this.isLoggedIn = authResData.token === '' ? false : true;
       console.log(this.userSub);
       })
    }

    onLogOut(){
        this.authService.logOut();
    }

    ngOnDestroy(): void {
        if(this.userSub){
            this.userSub.unsubscribe();
        }
     
    }

}