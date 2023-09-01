import { NgForm } from "@angular/forms";
import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";

import { AuthResponseData, AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    //In JS; const variableName = value;
    //In TS; const variableName: Type = value;
    //For TS property, initial value should be assigned
    // ! symbol can be used in TS to indicate that the value will be defintely be assigned, so initializing value is not necessary
    public isAuthenticated: Boolean = false;
    response: string = '';
    userList: any[] = [];
    ErrorMessage: string = '';

    constructor(private http: HttpClient,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute) { }

    onSubmit(authForm: NgForm) {
        let authObs: Observable<AuthResponseData>;
        authObs = this.authService.login(authForm.value.UserEmailId, authForm.value.UserPassword);

        //the return type of login() is Observable<AuthResponseData> you need variable of same type to subscribe
        authObs.subscribe({
            next: (res: AuthResponseData) => {

                this.GetUsers();

                this.isAuthenticated = true;
            },
            error: (err) => {
                this.ErrorMessage = err;
                console.log('Token Request Error: ', err);
                this.isAuthenticated = false;
            }
        });

    }

    GetUsers() {
        let userObs: Observable<string[]>;
        userObs = this.authService.GetUsers();
        userObs.subscribe({
            next: (res: string[]) => {
                //this.users.push(...res);
                this.userList = this.getUsers(res);
                this.router.navigate(['/about']);

            },
            error: (err) => {
                //can't concatenate String with Object, hence used ","
                console.log('User Request Error: ', err)
            }
        })

    }

    getUsers(res: string[]) {
        return res.slice();
    }
}