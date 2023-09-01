import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import jwtDecode from 'jwt-decode';

export interface AuthResponseData {
    token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    authResData = new BehaviorSubject<AuthResponseData>({ token: '' });
    userResData = new BehaviorSubject<string[]>(['']);
    private tokenExpirationTimer: any;
    hasWriteAccess: boolean = false;

    constructor(private http: HttpClient, private router: Router) { }

    login(emailId: string, password: string) {
        let credentials = {
            'emailid': emailId,
            'password': password
        }
        //In Interceptor we add the domain(https://localhost:7091) for each request
        return this.http.post<AuthResponseData>('Auth/Login', credentials)
            .pipe(
                catchError(this.HandleErrors),
                tap(resData => {
                    localStorage.setItem('token', resData.token);
                    this.extractTokenPermission(resData.token);
                    //The variables authResData and resData should have same type 
                    //In this case both are AuthResponseData
                    this.authResData.next(resData);
                })
            );
    }

    public GetUsers() {
        return this.http.get<string[]>('User')
            .pipe(tap(resData => {
                this.userResData.next(resData);
            }))
    }

    private HandleErrors(err: HttpErrorResponse) {
        let errorMessage = 'An Unknown Error Occured!';
        if (!err.error) {
            throwError(() => new Error(errorMessage));
        }
        switch (err.error.title) {
            case 'Unauthorized':
                errorMessage = 'Entered EmailId or Password is InCorrect!';
                break;
        }
        //The Error Thrown here is subscribed in auth.component.ts
        return throwError(() => new Error(errorMessage));
    }

    logOut() {
        this.authResData.next({ token: '' });
        this.router.navigate(['/auth']);
        localStorage.removeItem('token');
        this.hasWriteAccess = false;
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    //If the User has already Authenticated with EmailId and Password,
    //then till the token gets Expired, the user should be able to make request to server,
    //there is no need to provide credentials again, as we have token in localStorage.
    autoLogIn() {
        const tokenFromLocalStorage = localStorage.getItem('token');
        if (tokenFromLocalStorage === '') {
            return;
        }
        if (tokenFromLocalStorage) {
            const tokenData: AuthResponseData = { token: tokenFromLocalStorage };
            this.authResData.next(tokenData);
            this.checkTokenExpiry(tokenFromLocalStorage);
        }
    }

    //Once the token gets Expired, User should be loggedOut Automatically,
    //He should login again to make request to server
    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logOut();
        }, expirationDuration);
    }

    checkTokenExpiry(token: string): void {
        try {
            const decodedToken: any = jwtDecode<any>(token);
            console.log('DECODED TOKEN: ', decodedToken);
            const currentTime: number = Math.floor(Date.now() / 1000); // Convert to seconds
            const expirationDuration = (decodedToken.exp * 1000) - new Date().getTime();
            this.autoLogout(expirationDuration);
            this.extractTokenPermission(token);

            if (decodedToken.exp > currentTime) {
                console.log('Token is Valid and Not Expired.');
            } else {
                console.log('Token is Expired.');
            }
        } catch (error) {
            console.error('Error Decoding Token: ', error);
        }
    }

    extractTokenPermission(token: string): void {
        const decodedToken: any = jwtDecode<any>(token);
        if (decodedToken.Permission.includes('Write')) {
            this.hasWriteAccess = true;
        }else{
        }
    }
}

