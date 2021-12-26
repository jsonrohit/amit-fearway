import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class InterceptorService implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        
        // 
        // let data = {token:''};
        if (localStorage.getItem('userToken')) {
            let data:any = localStorage.getItem('userToken');
            data = JSON.parse(data);
            const tokenReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${data.access_token}`,
                }
            });
            return next.handle(tokenReq).pipe(
                map((event: HttpEvent<any>) => {
                    return event;
                }),
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                })
            );
        }
        else {
            const tokenReq = req.clone({
                setHeaders: { 'Content-Type': 'application/json' }
            });
            return next.handle(tokenReq).pipe(
                map((event: HttpEvent<any>) => {
                    // if (event instanceof HttpResponse) {
                    // }
                    return event;
                }),
                catchError((error: HttpErrorResponse) => {
                    //this.showError(error)
                    return throwError(error);
                })
            );
        }
    }

}
