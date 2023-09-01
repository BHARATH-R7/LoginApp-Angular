import { HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { exhaustMap, take } from "rxjs";
import { environment } from '../environment';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
   
    constructor(private authService: AuthService) { }
    //Since we don't know what type of data the request returns hence <any>
    intercept(req: HttpRequest<any>, next: HttpHandler) {

        const baseUrl = `${environment.apiUrl}`;

        const modifiedReq = req.clone({
            url: `${baseUrl}/${req.url}`
        });
        
        return this.authService.authResData.pipe(
            //takes 1st token also we have only one token
            //and immediately unsubscribes it
            take(1),
            exhaustMap(authResData => {
                if (!authResData) {
                    return next.handle(req);
                }
                const modifiedWithAuthReq  = modifiedReq.clone({
                    setHeaders: {
                        Authorization: `Bearer ${authResData.token}`
                    },
                });
                return next.handle(modifiedWithAuthReq );
            })
        );
    }
}